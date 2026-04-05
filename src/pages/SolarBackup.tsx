import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Button } from "@/components/ui/button";
import { Battery, Zap, Sun, Wind, ArrowRight, ShoppingCart, Tag } from "lucide-react";
import { getProductsByCategory, formatPrice } from "@/lib/products";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";
import { getSEOMeta } from "@/lib/seo";

const SUBCATEGORIES = [
  { label: "Battery Systems", href: "/solar-backup/battery-systems", icon: Battery, desc: "LFP 48V modules · 5kWh–30kWh stackable" },
  { label: "Solar Panels", href: "/solar-backup/solar-panels", icon: Sun, desc: "Mono PERC 400W–600W · Tier-1 manufacturers" },
  { label: "Inverter / Charger", href: "/solar-backup/inverters", icon: Zap, desc: "Hybrid split-phase 120/240V · MPPT built-in" },
  { label: "Complete Bundles", href: "/solar-backup/bundles", icon: Wind, desc: "Plug-and-play off-grid · 5kWh–20kWh" },
];

const SolarBackup = () => {
  const addItem = useCartStore((s) => s.addItem);
  const products = [
    ...getProductsByCategory("solar-backup/bundles"),
    ...getProductsByCategory("solar-backup/battery-systems"),
    ...getProductsByCategory("solar-backup/inverters"),
  ];

  useEffect(() => {
    const meta = getSEOMeta("solarBackup");
    document.title = meta.title;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero section */}
          <div className="relative mb-16 py-16 border border-border bg-card rounded-sm overflow-hidden">
            <div
              className="absolute inset-0 opacity-100"
              style={{
                background: "radial-gradient(ellipse at 80% 50%, hsl(4 86% 52% / 0.06) 0%, transparent 65%)",
              }}
            />
            <div className="relative z-10 max-w-2xl px-8">
              <span className="section-label mb-4 block">Solar Backup · Massachusetts</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Solar Backup Systems
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Professional-grade LFP battery backup systems engineered for New England's grid
                instability. From essential circuit protection to whole-home independence —
                we stock complete systems, not just components.
              </p>
              <Button className="btn-primary-glow font-semibold" asChild>
                <Link to="/solar-backup/bundles">
                  Shop Bundles <ArrowRight className="ml-2" size={15} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Subcategory grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {SUBCATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className="group p-5 border border-border bg-card rounded-sm hover:border-primary/40 transition-all text-center"
              >
                <div className="p-2.5 bg-primary/10 rounded-sm inline-flex mb-3">
                  <cat.icon size={18} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <span className="section-label mb-6 block">Available Systems</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col border border-border bg-card rounded-sm overflow-hidden card-hover"
                >
                  <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center">
                    <Zap size={40} className="text-border group-hover:text-primary/25 transition-colors" />
                    {product.badge && (
                      <span className="absolute top-3 left-3 font-mono text-[10px] uppercase px-2 py-0.5 bg-primary text-primary-foreground">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground leading-snug">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.tagline}</p>
                    </div>
                    <div className="flex items-baseline gap-2 mt-auto">
                      <span className="font-mono font-bold text-foreground">{formatPrice(product.price)}</span>
                    </div>
                    {product.price >= 2000 && (
                      <p className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                        <Tag size={9} className="text-primary" />
                        From ${Math.ceil(product.price / 60)}/mo · 0% APR
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs border-border hover:border-primary hover:text-primary" asChild>
                        <Link to={`/product/${product.handle}`}>View Details</Link>
                      </Button>
                      <Button size="sm" className="flex-1 text-xs btn-primary-glow" onClick={() => addItem(product)}>
                        <ShoppingCart size={12} className="mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SolarBackup;
