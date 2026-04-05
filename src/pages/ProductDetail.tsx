import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TechSpecsTable from "@/components/TechSpecsTable";
import FinancingWidget from "@/components/FinancingWidget";
import ComparisonModule from "@/components/ComparisonModule";
import ConsultationCTA from "@/components/ConsultationCTA";
import UpsellEngine from "@/components/UpsellEngine";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ShoppingCart, Truck, Shield, Award, Zap,
  Phone, CheckCircle, Tag
} from "lucide-react";
import { getProductByHandle, getUpsellProducts, formatPrice } from "@/lib/products";
import { useCartStore } from "@/stores/cartStore";
import { getProductSEOMeta } from "@/lib/seo";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const product = handle ? getProductByHandle(handle) : undefined;

  useEffect(() => {
    if (!product) return;
    const meta = getProductSEOMeta(product.name, product.category, product.price);
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      (desc as HTMLMetaElement).name = "description";
      document.head.appendChild(desc);
    }
    (desc as HTMLMetaElement).content = meta.description;
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found.</p>
          <Button asChild variant="outline">
            <Link to="/products">
              <ArrowLeft size={14} className="mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const upsells = getUpsellProducts(product.upsells);
  const monthly = Math.ceil(product.price / 60);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-mono">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Main PDP grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left — Image */}
            <div>
              <div className="aspect-[4/3] bg-card border border-border rounded-sm flex items-center justify-center relative overflow-hidden">
                <Zap size={80} className="text-border" />
                {product.badge && (
                  <span className="absolute top-4 left-4 font-mono text-xs tracking-wide uppercase px-3 py-1 bg-primary text-primary-foreground">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail row */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      className="w-16 h-16 bg-card border border-border hover:border-primary transition-colors rounded-sm flex items-center justify-center"
                      aria-label={`Image ${i + 1}`}
                    >
                      <Zap size={18} className="text-border" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Product info */}
            <div className="space-y-6">
              {/* Brand + SKU */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {product.brand}
                </span>
                <span className="spec-badge">SKU: {product.sku}</span>
              </div>

              {/* Name */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="font-mono text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="font-mono text-sm text-primary font-semibold">
                    Save {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Financing teaser */}
              {product.price >= 2000 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/60 border border-border rounded-sm">
                  <Tag size={13} className="text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    From{" "}
                    <span className="font-mono font-bold text-foreground">
                      ${monthly}/mo
                    </span>{" "}
                    · 0% APR available ·{" "}
                    <Link to="/financing" className="text-primary hover:underline underline-offset-2">
                      Check rate
                    </Link>
                  </p>
                </div>
              )}

              {/* Key highlights */}
              <div className="grid grid-cols-2 gap-2">
                {product.specs
                  .filter((s) => s.highlight)
                  .slice(0, 4)
                  .map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-col p-3 bg-card border border-border rounded-sm"
                    >
                      <span className="font-mono text-xs text-muted-foreground">{spec.label}</span>
                      <span className="font-mono text-sm font-bold text-foreground mt-0.5">
                        {spec.value}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Add to cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 btn-primary-glow h-12 font-semibold tracking-wide text-base"
                  onClick={() => addItem(product)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={17} className="mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 sm:flex-none h-12 border-border hover:border-primary hover:text-primary font-semibold"
                  asChild
                >
                  <a href="tel:+16175550199">
                    <Phone size={15} className="mr-2" />
                    Call an Expert
                  </a>
                </Button>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Shield, text: product.warranty },
                  { icon: Truck, text: product.freightNote ?? "Standard shipping" },
                  { icon: Award, text: "Authorized Dealer" },
                ].map((t) => (
                  <div key={t.text} className="flex items-start gap-2">
                    <t.icon size={13} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground leading-relaxed">{t.text}</span>
                  </div>
                ))}
              </div>

              {/* In-stock badge */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle
                  size={13}
                  className={product.inStock ? "text-primary" : "text-destructive"}
                />
                {product.inStock ? "In Stock · Usually ships within 3–5 business days" : "Currently Out of Stock"}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12 max-w-3xl">
            <span className="section-label mb-4 block">Product Overview</span>
            <p className="text-muted-foreground leading-relaxed text-base">{product.description}</p>
          </div>

          {/* Technical Specs Table */}
          <div className="mb-12">
            <TechSpecsTable specs={product.specs} productName={product.name} />
          </div>

          {/* Financing Widget */}
          {product.price >= 2000 && (
            <div className="mb-12 max-w-2xl">
              <FinancingWidget price={product.price} productName={product.name} />
            </div>
          )}

          {/* Comparison Module */}
          <div className="mb-12">
            <ComparisonModule />
          </div>

          {/* Upsell Engine */}
          {upsells.length > 0 && (
            <div className="mb-12">
              <UpsellEngine products={upsells} title="Frequently Bought Together" />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
