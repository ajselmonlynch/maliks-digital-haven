import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Tag, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, formatPrice, type ProductCategory } from "@/lib/products";
import { useCartStore } from "@/stores/cartStore";
import { getSEOMeta } from "@/lib/seo";

const CATEGORY_FILTERS: { label: string; value: string }[] = [
  { label: "All Products", value: "all" },
  { label: "Solar Bundles", value: "solar-backup/bundles" },
  { label: "Battery Systems", value: "solar-backup/battery-systems" },
  { label: "Solar Panels", value: "solar-backup/solar-panels" },
  { label: "Inverters", value: "solar-backup/inverters" },
  { label: "LED Grow Lights", value: "grow-automation/led-systems" },
  { label: "Climate Control", value: "grow-automation/climate" },
  { label: "Irrigation", value: "grow-automation/irrigation" },
  { label: "HVAC & Air", value: "grow-automation/hvac" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name" },
];

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const meta = getSEOMeta("products");
    document.title = meta.title;
  }, []);

  const filtered = PRODUCTS.filter((p) =>
    activeFilter === "all" ? true : p.category === activeFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    // featured: featured first
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const activeLabel =
    CATEGORY_FILTERS.find((f) => f.value === activeFilter)?.label ?? "All Products";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <span className="section-label mb-3 block">Catalog</span>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">All Systems</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {sorted.length} products · {activeLabel}
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={13} className="text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card border border-border text-sm text-foreground px-3 py-1.5 rounded-sm focus:outline-none focus:border-primary font-mono"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Sidebar Filters ──────────────────────────────────── */}
            <aside className="lg:w-48 shrink-0">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Category
              </p>
              <ul className="space-y-0.5">
                {CATEGORY_FILTERS.map((f) => (
                  <li key={f.value}>
                    <button
                      onClick={() => setActiveFilter(f.value)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-sm transition-colors ${
                        activeFilter === f.value
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {f.label}
                    </button>
                  </li>
                ))}
              </ul>

              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <X size={11} /> Clear filter
                </button>
              )}
            </aside>

            {/* ── Products Grid ─────────────────────────────────────── */}
            <div className="flex-1">
              {sorted.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                  <Zap size={32} className="text-border" />
                  <p className="text-muted-foreground">No products in this category yet.</p>
                  <Button variant="outline" onClick={() => setActiveFilter("all")}>
                    View All Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {sorted.map((product) => (
                    <div
                      key={product.id}
                      className="group flex flex-col border border-border bg-card rounded-sm overflow-hidden card-hover"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center overflow-hidden">
                        <Zap size={40} className="text-border group-hover:text-primary/25 transition-colors" />
                        {product.badge && (
                          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase px-2 py-0.5 bg-primary text-primary-foreground">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-4 gap-2.5">
                        <div>
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                            {product.brand}
                          </span>
                          <h3 className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
                            {product.name}
                          </h3>
                        </div>

                        {/* Key specs */}
                        <div className="flex flex-wrap gap-1">
                          {product.specs
                            .filter((s) => s.highlight)
                            .slice(0, 2)
                            .map((spec) => (
                              <span key={spec.label} className="spec-badge">{spec.value}</span>
                            ))}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-auto">
                          <span className="font-mono font-bold text-foreground">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="font-mono text-xs text-muted-foreground line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </div>

                        {/* Financing */}
                        {product.price >= 2000 && (
                          <p className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                            <Tag size={9} className="text-primary" />
                            From ${Math.ceil(product.price / 60)}/mo · 0% APR
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs border-border hover:border-primary hover:text-primary h-8"
                            asChild
                          >
                            <Link to={`/product/${product.handle}`}>Details</Link>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 text-xs btn-primary-glow h-8"
                            onClick={() => addItem(product)}
                          >
                            <ShoppingCart size={12} className="mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
