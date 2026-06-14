import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products?collection=ajs-snack-shack", label: "AJ's Snack Shack" },
    { to: "/products?collection=sayings", label: "The Sayings" },
    { to: "/products?collection=snacks", label: "Exotic Snacks" },
    { to: "/products", label: "Shop All" },
    { to: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname + location.search === path || (path === "/" && location.pathname === "/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A] border-b border-[#2A2A2A]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-3xl text-hiviz tracking-widest uppercase">Blue Collar</span>
            <span className="font-display text-3xl text-white tracking-widest uppercase">Bodega</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-condensed text-sm font-semibold tracking-widest uppercase transition-colors hover:text-hiviz ${
                  isActive(link.to) ? "text-hiviz" : "text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart */}
          <div className="hidden md:flex items-center gap-4">
            <CartDrawer />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-[#2A2A2A] pt-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block font-condensed text-sm font-semibold tracking-widest uppercase transition-colors hover:text-hiviz ${
                  isActive(link.to) ? "text-hiviz" : "text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <CartDrawer />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
