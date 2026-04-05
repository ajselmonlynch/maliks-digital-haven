import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Award, Truck, Zap, CheckCircle } from "lucide-react";

const TRUST_BADGES = [
  {
    icon: Shield,
    title: "Authorized Dealer",
    desc: "Official distributor for all carried brands",
  },
  {
    icon: Award,
    title: "MAP Price Compliant",
    desc: "Minimum Advertised Price enforced site-wide",
  },
  {
    icon: Truck,
    title: "Freight Specialist",
    desc: "White-glove LTL & residential delivery",
  },
  {
    icon: Zap,
    title: "5-Year LFP Warranty",
    desc: "Industry-leading battery cell coverage",
  },
];

const SOLAR_LINKS = [
  { to: "/solar-backup/battery-systems", label: "LFP Battery Systems" },
  { to: "/solar-backup/solar-panels", label: "Solar Panel Arrays" },
  { to: "/solar-backup/inverters", label: "Inverter / Charger Combos" },
  { to: "/solar-backup/bundles", label: "Complete Backup Bundles" },
];

const GROW_LINKS = [
  { to: "/grow-automation/led-systems", label: "LED Grow Light Systems" },
  { to: "/grow-automation/climate", label: "Climate Controllers" },
  { to: "/grow-automation/irrigation", label: "Irrigation Automation" },
  { to: "/grow-automation/hvac", label: "HVAC & Air Systems" },
];

const COMPANY_LINKS = [
  { to: "/about", label: "About SolarCore" },
  { to: "/financing", label: "Financing Options" },
  { to: "/contact", label: "Expert Consultation" },
  { to: "/journal", label: "Knowledge Base" },
];

const LEGAL_LINKS = [
  { to: "/legal/shipping", label: "Shipping & Freight Policy" },
  { to: "/legal/map-policy", label: "MAP Pricing Policy" },
  { to: "/legal/warranty", label: "Warranty Terms" },
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/terms", label: "Terms of Service" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      {/* Trust badges row */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-sm shrink-0 mt-0.5">
                  <b.icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-mono font-bold text-xl tracking-tight text-foreground">
                SOLAR<span className="text-primary">CORE</span>
              </span>
              <span className="block font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mt-0.5">
                Systems
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Professional-grade solar backup and grow automation systems.
              Serving commercial cultivators, off-grid homesteaders, and energy-conscious
              businesses across New England.
            </p>

            {/* MA Address */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <span>
                  123 Industrial Way, Suite 4B<br />
                  Boston, MA 02101
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} className="text-primary shrink-0" />
                <a href="tel:+16175550199" className="hover:text-primary transition-colors">
                  (617) 555-0199
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} className="text-primary shrink-0" />
                <a href="mailto:sales@solarcoresystems.com" className="hover:text-primary transition-colors">
                  sales@solarcoresystems.com
                </a>
              </div>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["UL Listed", "NEC 2023", "MA Licensed", "EPA Compliant"].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1 spec-badge text-[10px] border-primary/20 text-muted-foreground"
                >
                  <CheckCircle size={9} className="text-primary" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Solar Backup column */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary mb-4">
              Solar Backup
            </h4>
            <ul className="space-y-2.5">
              {SOLAR_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Grow Automation column */}
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary mb-4">
              Grow Automation
            </h4>
            <ul className="space-y-2.5">
              {GROW_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} SolarCore Systems LLC · Boston, MA · All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted-foreground text-center">
            Prices subject to MAP compliance. Financing subject to credit approval.
          </p>
          <div className="flex items-center gap-4">
            <span className="spec-badge text-[10px]">SSL Secured</span>
            <span className="spec-badge text-[10px]">PCI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
