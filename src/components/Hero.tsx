import { Link } from "react-router-dom";
import { ArrowRight, Zap, ShieldCheck, Phone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "30kWh", label: "Max Storage Capacity", mono: true },
  { value: "98.5%", label: "Round-Trip Efficiency", mono: true },
  { value: "6,000+", label: "LFP Cycle Life", mono: true },
  { value: "5-Year", label: "Battery Warranty", mono: true },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, text: "MAP Price Compliant" },
  { icon: Zap, text: "Authorized Dealer" },
  { icon: TrendingUp, text: "0% Financing Available" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">
      {/* Architectural grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" aria-hidden="true" />

      {/* Red radial glow — upper left */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(4 86% 52% / 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Gradient fade bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="section-label">SolarCore Systems · Boston, MA</span>
            <span className="h-px w-12 bg-primary/50" />
            <span className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
              High-Ticket · Drop-Ship · Dealer Direct
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-6">
            Energy Freedom.{" "}
            <br className="hidden sm:block" />
            <span className="text-primary" style={{ textShadow: "var(--glow-red-sm)" }}>
              High-Yield Security.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-4">
            Professional solar backup systems and solar-powered grow automation
            engineered for critical infrastructure, commercial cultivation, and
            whole-home independence.
          </p>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed mb-10">
            LFP chemistry · Tier-1 panels · Plug-and-play bundles starting at{" "}
            <span className="font-mono text-foreground font-semibold">$2,499</span>. Financing
            available on orders over{" "}
            <span className="font-mono text-foreground font-semibold">$2,000</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              className="btn-primary-glow h-12 px-8 text-base font-semibold tracking-wide"
              asChild
            >
              <Link to="/products">
                Shop Systems <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold tracking-wide border-border hover:border-primary hover:text-primary"
              asChild
            >
              <Link to="/solar-backup/bundles">View Bundles</Link>
            </Button>

            <a
              href="tel:+16175550199"
              className="flex items-center justify-center gap-2 h-12 px-6 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-border rounded-sm"
            >
              <Phone size={15} />
              Speak to an Expert
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden border border-border">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-card px-5 py-4 flex flex-col gap-1"
              >
                <span className="font-mono text-2xl font-bold text-foreground">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="relative z-10 border-t border-border bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            {TRUST_BADGES.map((b) => (
              <span
                key={b.text}
                className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
              >
                <b.icon size={14} className="text-primary shrink-0" />
                {b.text}
              </span>
            ))}
            <span className="hidden md:block ml-auto font-mono text-[11px] text-muted-foreground tracking-wide">
              Serving Massachusetts, New England & Beyond · Free Freight on Orders $3,000+
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
