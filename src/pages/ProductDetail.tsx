import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SHOPIFY_STORE_PERMANENT_DOMAIN = 'maliks-digital-haven-6tste.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '4cee1a665fa0d673b7d2aad04a6c3872';

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(PRODUCT_QUERY, { handle });
        if (data.data.productByHandle) {
          const productData = { node: data.data.productByHandle };
          setProduct(productData);
          setSelectedVariant(productData.node.variants.edges[0].node);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    
    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid md:grid-cols-2 gap-12">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 py-16 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/products')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary/20">
                {product.node.images.edges[selectedImage] && (
                  <img
                    src={product.node.images.edges[selectedImage].node.url}
                    alt={product.node.images.edges[selectedImage].node.altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {product.node.images.edges.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.node.images.edges.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || ''}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.node.title}</h1>
                <p className="text-3xl font-bold">
                  {selectedVariant.price.currencyCode} ${parseFloat(selectedVariant.price.amount).toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground whitespace-pre-line">
                {product.node.description}
              </p>

              {product.node.options.length > 0 && product.node.options[0].values.length > 1 && (
                <div className="space-y-4">
                  {product.node.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium mb-2">{option.name}</label>
                      <Select
                        value={selectedVariant.selectedOptions.find((o: any) => o.name === option.name)?.value}
                        onValueChange={(value) => {
                          const variant = product.node.variants.edges.find((v) =>
                            v.node.selectedOptions.some((o) => o.name === option.name && o.value === value)
                          );
                          if (variant) setSelectedVariant(variant.node);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {option.values.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedVariant.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {selectedVariant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
