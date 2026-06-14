import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#2A2A2A]">
      {/* Top accent */}
      <div className="h-1 bg-hiviz" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="font-display text-4xl text-hiviz tracking-widest block">Blue Collar</span>
              <span className="font-display text-4xl text-white tracking-widest block">Bodega</span>
            </div>
            <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
              Built for the working class. Foxboro, MA. We show up for the people who show up every day.
            </p>
            <p className="font-condensed text-hiviz text-xs tracking-[0.3em] uppercase mt-4">
              little shack. BIG IMPACT.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-condensed font-bold text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Shop</h4>
            <ul className="space-y-3">
              {[
                { to: "/products", label: "Shop All" },
                { to: "/products?collection=ajs-snack-shack", label: "AJ's Snack Shack" },
                { to: "/products?collection=sayings", label: "The Sayings Collection" },
                { to: "/products?collection=snacks", label: "Exotic Snacks" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans text-sm text-white/60 hover:text-hiviz transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-condensed font-bold text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Info</h4>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
                { to: "/legal/privacy", label: "Privacy Policy" },
                { to: "/legal/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-sans text-sm text-white/60 hover:text-hiviz transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Blue Collar Bodega. All rights reserved.
          </p>
          <p className="font-condensed text-xs tracking-widest uppercase text-white/30">
            Foxboro, MA — Printed on Demand — Ships in 2–4 Business Days
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
