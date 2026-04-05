import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Button } from "@/components/ui/button";
import { Leaf, Cpu, Droplets, Thermometer, ArrowRight, ShoppingCart, Tag, Zap } from "lucide-react";
import { getProductsByCategory, formatPrice } from "@/lib/products";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";
import { getSEOMeta } from "@/lib/seo";

const SUBCATEGORIES = [
  { label: "LED Grow Lights", href: "/grow-automation/led-systems", icon: Leaf, desc: "Full-spectrum · Samsung LM301H · 2.9 µmol/J" },
  { label: "Climate Control", href: "/grow-automation/climate", icon: Cpu, desc: "VPD · CO₂ · Temp/RH precision automation" },
  { label: "Irrigation", href: "/grow-automation/irrigation", icon: Droplets, desc: "Drip · flood table · fertigation systems" },
  { label: "HVAC & Air", href: "/grow-automation/hvac", icon: Thermometer, desc: "Mini-split · dehumidifiers · HEPA filtration" },
];

const GrowAutomation = () => {
  const addItem = useCartStore((s) => s.addItem);
  const products = [
    ...getProductsByCategory("grow-automation/led-systems"),
    ...getProductsByCategory("grow-automation/climate"),
  ];

  useEffect(() => {
    const meta = getSEOMeta("growAutomation");
    document.title = meta.title;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="relative mb-16 py-16 border border-border bg-card rounded-sm overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 80% 50%, hsl(4 86% 52% / 0.06) 0%, transparent 65%)",
              }}
            />
            <div className="relative z-10 max-w-2xl px-8">
              <span className="section-label mb-4 block">Grow Automation · Massachusetts</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Solar-Powered Grow Automation
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Commercial-grade indoor grow automation systems designed for precision cultivation.
                Full-spectrum LEDs, VPD climate controllers, CO₂ enrichment, and automated
                irrigation — all engineered for solar-powered operation.
              </p>
              <Button className="btn-primary-glow font-semibold" asChild>
                <Link to="/grow-automation/led-systems">
                  Shop LED Systems <ArrowRight className="ml-2" size={15} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Subcategories */}
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

export default GrowAutomation;
