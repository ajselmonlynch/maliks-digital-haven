import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore, ShopifyProduct } from "@/stores/cartStore";
import { ShoppingCart, Package } from "lucide-react";

const SHOPIFY_STORE_PERMANENT_DOMAIN = 'maliks-digital-haven-6tste.myshopify.com';
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '4cee1a665fa0d673b7d2aad04a6c3872';

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges { node { url altText } }
          }
          variants(first: 10) {
            edges {
              node {
                id title
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

const COLLECTIONS = [
  { id: "all", label: "Shop All" },
  { id: "ajs-snack-shack", label: "AJ's Snack Shack" },
  { id: "sayings", label: "The Sayings" },
  { id: "snacks", label: "Exotic Snacks" },
];

const collectionTitles: Record<string, { title: string; sub: string }> = {
  all: { title: "Shop All", sub: "Everything in the Bodega." },
  "ajs-snack-shack": { title: "AJ's Snack Shack", sub: "The job site legend. Apparel for the trades." },
  sayings: { title: "The Sayings Collection", sub: "Job site phrases on heavy gear." },
  snacks: { title: "Exotic Snacks", sub: "International flavors. Straight to the site." },
};

const Products = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const addItem = useCartStore((state) => state.addItem);

  const params = new URLSearchParams(location.search);
  const activeCollection = params.get("collection") || "all";
  const collectionInfo = collectionTitles[activeCollection] || collectionTitles["all"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCollection === "all"
    ? products
    : products.filter((p) => {
        const tags: string[] = p.node.tags || [];
        const type: string = p.node.productType || "";
        if (activeCollection === "ajs-snack-shack") return tags.some(t => t.toLowerCase().includes("ajs") || t.toLowerCase().includes("snack-shack")) || type.toLowerCase().includes("apparel");
        if (activeCollection === "sayings") return tags.some(t => t.toLowerCase().includes("saying")) || type.toLowerCase().includes("saying");
        if (activeCollection === "snacks") return tags.some(t => t.toLowerCase().includes("snack") || t.toLowerCase().includes("food")) || type.toLowerCase().includes("snack");
        return true;
      });

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    addItem({ product, variantId: variant.id, variantTitle: variant.title, price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Navigation />
      <main className="flex-1 pt-24">
        {/* Page Header */}
        <section className="bg-[#2A2A2A] py-16 border-b border-[#333]">
          <div className="container mx-auto px-6">
            <p className="font-condensed text-hiviz text-sm tracking-[0.3em] uppercase mb-2">Blue Collar Bodega</p>
            <h1 className="font-display text-5xl md:text-7xl text-white mb-4">{collectionInfo.title}</h1>
            <p className="font-sans text-white/60 text-lg">{collectionInfo.sub}</p>
          </div>
        </section>

        {/* Collection Tabs */}
        <section className="bg-[#1A1A1A] border-b border-[#2A2A2A] sticky top-[73px] z-40">
          <div className="container mx-auto px-6">
            <div className="flex gap-0 overflow-x-auto">
              {COLLECTIONS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => navigate(col.id === "all" ? "/products" : `/products?collection=${col.id}`)}
                  className={`font-condensed font-bold text-xs tracking-widest uppercase px-6 py-4 border-b-2 whitespace-nowrap transition-colors ${
                    activeCollection === col.id
                      ? "border-hiviz text-hiviz"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  {col.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-[#2A2A2A] border border-[#333]">
                    <Skeleton className="aspect-square w-full bg-[#333]" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 bg-[#333] mb-2" />
                      <Skeleton className="h-4 w-1/2 bg-[#333]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <Package className="h-16 w-16 text-white/20 mx-auto mb-6" />
                <h2 className="font-display text-4xl text-white mb-4">Nothing Here Yet</h2>
                <p className="font-sans text-white/50 mb-8">Products are being added. Check back soon.</p>
                <button
                  onClick={() => navigate("/products")}
                  className="font-condensed font-bold text-sm tracking-widest uppercase border-2 border-hiviz text-hiviz py-3 px-8 hover:bg-hiviz hover:text-[#1A1A1A] transition-colors"
                >
                  Shop All
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.node.id}
                    className="bg-[#2A2A2A] border border-[#333] flex flex-col group cursor-pointer hover:border-hiviz transition-colors"
                    onClick={() => navigate(`/product/${product.node.handle}`)}
                  >
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-[#333] relative">
                      {product.node.images.edges[0] ? (
                        <img
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.images.edges[0].node.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-white/20" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-condensed font-bold text-white text-lg leading-tight mb-1 group-hover:text-hiviz transition-colors">
                        {product.node.title}
                      </h3>
                      <p className="font-sans text-white/50 text-xs line-clamp-2 mb-4 flex-1">
                        {product.node.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-2xl text-hiviz">
                          ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          className="bg-hiviz text-[#1A1A1A] font-condensed font-bold text-xs tracking-widest uppercase hover:bg-white rounded-none px-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
