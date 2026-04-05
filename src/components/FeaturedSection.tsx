import { Link } from "react-router-dom";
import { ArrowRight, Battery, Leaf, Star, Zap, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, formatPrice } from "@/lib/products";
import { useCartStore } from "@/stores/cartStore";

const CATEGORY_TILES = [
  {
    label: "Solar Backup",
    sub: "LFP batteries · Inverters · Bundles",
    href: "/solar-backup",
    icon: Battery,
    stat: "Up to 30kWh",
  },
  {
    label: "Grow Automation",
    sub: "LED · VPD · CO₂ · Irrigation",
    href: "/grow-automation",
    icon: Leaf,
    stat: "4,000W LED arrays",
  },
];

const FeaturedSection = () => {
  const featured = getFeaturedProducts();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-6 space-y-16">

        {/* ── Category Tiles ─────────────────────────────────────────── */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="section-label mb-2 block">Product Lines</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Two systems. One mission.
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              All Products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORY_TILES.map((tile) => (
              <Link
                key={tile.href}
                to={tile.href}
                className="group relative flex items-end p-7 min-h-[200px] border border-border bg-card rounded-sm overflow-hidden card-hover"
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(ellipse at 20% 80%, hsl(4 86% 52% / 0.07) 0%, transparent 60%)",
                  }}
                />

                {/* Icon top-right */}
                <div className="absolute top-5 right-5 p-2.5 bg-primary/10 rounded-sm">
                  <tile.icon size={22} className="text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary block mb-2">
                    {tile.stat}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-1">{tile.label}</h3>
                  <p className="text-sm text-muted-foreground">{tile.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Shop {tile.label} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Featured Products Grid ──────────────────────────────────── */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="section-label mb-2 block">Featured Systems</span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Engineer-recommended bundles
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col border border-border bg-card rounded-sm overflow-hidden card-hover"
              >
                {/* Product image / placeholder */}
                <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center overflow-hidden">
                  <Zap
                    size={48}
                    className="text-border group-hover:text-primary/30 transition-colors"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 bg-primary text-primary-foreground">
                      {product.badge}
                    </span>
                  )}

                  {/* Compare-at discount */}
                  {product.compareAtPrice && (
                    <span className="absolute top-3 right-3 font-mono text-[10px] tracking-wide px-2 py-0.5 bg-card border border-border text-muted-foreground">
                      Save {formatPrice(product.compareAtPrice - product.price)}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                      {product.brand}
                    </span>
                    <h3 className="font-semibold text-foreground mt-0.5 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Highlight specs */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs
                      .filter((s) => s.highlight)
                      .slice(0, 3)
                      .map((spec) => (
                        <span key={spec.label} className="spec-badge">
                          {spec.value}
                        </span>
                      ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="font-mono text-xl font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="font-mono text-sm text-muted-foreground line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  {/* Financing note */}
                  {product.price >= 2000 && (
                    <p className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                      <Tag size={10} className="text-primary" />
                      Or from{" "}
                      <span className="text-foreground font-semibold ml-1">
                        ${Math.ceil(product.price / 60)}/mo
                      </span>
                      &nbsp;· 0% financing
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-border hover:border-primary hover:text-primary"
                      asChild
                    >
                      <Link to={`/product/${product.handle}`}>View Details</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs btn-primary-glow"
                      onClick={() => addItem(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:border-primary hover:text-primary font-medium tracking-wide"
              asChild
            >
              <Link to="/products">
                View All Products <ArrowRight className="ml-2" size={15} />
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Social Proof Strip ──────────────────────────────────────── */}
        <div className="border border-border bg-card rounded-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "500+", label: "Systems Deployed", sub: "Across New England" },
              { stat: "4.9 / 5", label: "Customer Rating", sub: "Based on 180+ reviews" },
              { stat: "$2M+", label: "Energy Cost Saved", sub: "By SolarCore customers" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="font-mono text-3xl font-bold text-foreground">{item.stat}</p>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;
