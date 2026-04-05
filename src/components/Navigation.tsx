import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown, ShoppingCart, Phone,
  Zap, Leaf, Battery, Sun, Cpu, Wind,
  Thermometer, Droplets, Shield, Award
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";

const solarBackupItems = [
  {
    icon: Battery,
    label: "LFP Battery Systems",
    desc: "5kWh – 30kWh lithium iron phosphate",
    href: "/solar-backup/battery-systems",
  },
  {
    icon: Sun,
    label: "Solar Panel Arrays",
    desc: "Mono PERC · 400W – 600W panels",
    href: "/solar-backup/solar-panels",
  },
  {
    icon: Zap,
    label: "Inverter / Charger Combos",
    desc: "Hybrid split-phase 120/240V",
    href: "/solar-backup/inverters",
  },
  {
    icon: Wind,
    label: "Complete Backup Bundles",
    desc: "Plug-and-play off-grid systems",
    href: "/solar-backup/bundles",
  },
];

const growAutomationItems = [
  {
    icon: Leaf,
    label: "LED Grow Light Systems",
    desc: "Full-spectrum · 1000W – 4000W",
    href: "/grow-automation/led-systems",
  },
  {
    icon: Cpu,
    label: "Climate Controllers",
    desc: "VPD · CO₂ · Temp/RH automation",
    href: "/grow-automation/climate",
  },
  {
    icon: Droplets,
    label: "Irrigation Automation",
    desc: "Drip · Flood table · fertigation",
    href: "/grow-automation/irrigation",
  },
  {
    icon: Thermometer,
    label: "HVAC & Air Systems",
    desc: "Mini-split · dehumidifiers · HEPA",
    href: "/grow-automation/hvac",
  },
];

type MegaMenuKey = "solar" | "grow" | null;

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<MegaMenuKey>(null);
  const [mobileSub, setMobileSub] = useState<MegaMenuKey>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.qty, 0));

  // Close megamenu on route change
  useEffect(() => {
    setMegaMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (prefix: string) =>
    location.pathname === prefix || location.pathname.startsWith(prefix + "/");

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
    >
      {/* Top bar — trust strip */}
      <div className="hidden md:flex items-center justify-center gap-8 bg-secondary/60 border-b border-border px-6 py-1.5">
        <span className="font-mono text-[11px] text-muted-foreground tracking-wide flex items-center gap-1.5">
          <Shield size={11} className="text-primary" />
          Authorized Dealer · MAP Compliant
        </span>
        <span className="font-mono text-[11px] text-muted-foreground tracking-wide flex items-center gap-1.5">
          <Award size={11} className="text-primary" />
          5-Year LFP Battery Warranty
        </span>
        <span className="font-mono text-[11px] text-muted-foreground tracking-wide flex items-center gap-1.5">
          <Phone size={11} className="text-primary" />
          Expert Consultations: (617) 555-0199
        </span>
      </div>

      {/* Main nav row */}
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col leading-none shrink-0"
            aria-label="SolarCore Systems Home"
          >
            <span className="font-mono font-bold text-lg tracking-tight text-foreground">
              SOLAR<span className="text-primary">CORE</span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground uppercase">
              Systems
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Solar Backup megamenu trigger */}
            <button
              onMouseEnter={() => setMegaMenu("solar")}
              onFocus={() => setMegaMenu("solar")}
              onClick={() => setMegaMenu(megaMenu === "solar" ? null : "solar")}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-sm hover:text-primary ${
                isActive("/solar-backup") ? "text-primary" : "text-foreground"
              }`}
              aria-expanded={megaMenu === "solar"}
            >
              Solar Backup
              <ChevronDown
                size={14}
                className={`transition-transform ${megaMenu === "solar" ? "rotate-180" : ""}`}
              />
            </button>

            {/* Grow Automation megamenu trigger */}
            <button
              onMouseEnter={() => setMegaMenu("grow")}
              onFocus={() => setMegaMenu("grow")}
              onClick={() => setMegaMenu(megaMenu === "grow" ? null : "grow")}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-sm hover:text-primary ${
                isActive("/grow-automation") ? "text-primary" : "text-foreground"
              }`}
              aria-expanded={megaMenu === "grow"}
            >
              Grow Automation
              <ChevronDown
                size={14}
                className={`transition-transform ${megaMenu === "grow" ? "rotate-180" : ""}`}
              />
            </button>

            <Link
              to="/products"
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-sm hover:text-primary ${
                isActive("/products") && !isActive("/solar-backup") && !isActive("/grow-automation")
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              All Products
            </Link>

            <Link
              to="/financing"
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-sm hover:text-primary ${
                isActive("/financing") ? "text-primary" : "text-foreground"
              }`}
            >
              Financing
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-sm hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone size={13} />
              (617) 555-0199
            </Link>
            <CartDrawer />
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <CartDrawer />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Megamenu panels */}
      {megaMenu && (
        <div
          className="hidden lg:block border-t border-border bg-card/98 backdrop-blur-sm shadow-2xl"
          onMouseLeave={() => setMegaMenu(null)}
        >
          <div className="container mx-auto px-6 py-6">
            {megaMenu === "solar" && (
              <MegaMenuPanel
                label="Solar Backup Systems"
                desc="Professional-grade energy independence. LFP chemistry. Massachusetts-stocked."
                items={solarBackupItems}
                cta={{ label: "View All Solar Backup", href: "/solar-backup" }}
                badge="Off-Grid Ready"
              />
            )}
            {megaMenu === "grow" && (
              <MegaMenuPanel
                label="Grow Automation"
                desc="Precision-controlled indoor environments. Solar-powered. Commercial scale."
                items={growAutomationItems}
                cta={{ label: "View All Grow Systems", href: "/grow-automation" }}
                badge="Commercial Grade"
              />
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="container mx-auto px-6 py-4 space-y-1">
            <MobileSection
              label="Solar Backup"
              items={solarBackupItems}
              isOpen={mobileSub === "solar"}
              onToggle={() => setMobileSub(mobileSub === "solar" ? null : "solar")}
            />
            <MobileSection
              label="Grow Automation"
              items={growAutomationItems}
              isOpen={mobileSub === "grow"}
              onToggle={() => setMobileSub(mobileSub === "grow" ? null : "grow")}
            />
            {[
              { to: "/products", label: "All Products" },
              { to: "/financing", label: "Financing" },
              { to: "/contact", label: "Contact / Consultation" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border">
              <a
                href="tel:+16175550199"
                className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
              >
                <Phone size={13} className="text-primary" />
                (617) 555-0199
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

/* ---------- Sub-components ---------- */

interface MegaMenuItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  desc: string;
  href: string;
}

function MegaMenuPanel({
  label,
  desc,
  items,
  cta,
  badge,
}: {
  label: string;
  desc: string;
  items: MegaMenuItem[];
  cta: { label: string; href: string };
  badge: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Left: header */}
      <div className="space-y-3">
        <span className="section-label">{badge}</span>
        <h3 className="text-lg font-semibold text-foreground leading-tight">{label}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        <Link
          to={cta.href}
          className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          {cta.label} →
        </Link>
      </div>

      {/* Right: items grid */}
      <div className="col-span-2 grid grid-cols-2 gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-start gap-3 p-3 rounded-sm border border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70 transition-all card-hover group"
          >
            <span className="mt-0.5 p-1.5 bg-primary/10 rounded-sm shrink-0">
              <item.icon size={16} className="text-primary" />
            </span>
            <span>
              <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </span>
              <span className="block text-xs text-muted-foreground mt-0.5">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileSection({
  label,
  items,
  isOpen,
  onToggle,
}: {
  label: string;
  items: MegaMenuItem[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="pl-4 py-2 space-y-2 border-l border-border ml-1">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon size={13} className="text-primary shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navigation;
