import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SolarBackup from "./pages/SolarBackup";
import GrowAutomation from "./pages/GrowAutomation";
import Financing from "./pages/Financing";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Legal pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ShippingPolicy from "./pages/legal/Shipping";
import MapPolicy from "./pages/legal/MapPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />

          {/* Category pages */}
          <Route path="/solar-backup" element={<SolarBackup />} />
          <Route path="/solar-backup/:sub" element={<SolarBackup />} />
          <Route path="/grow-automation" element={<GrowAutomation />} />
          <Route path="/grow-automation/:sub" element={<GrowAutomation />} />

          {/* Revenue pages */}
          <Route path="/financing" element={<Financing />} />

          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Legal */}
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/shipping" element={<ShippingPolicy />} />
          <Route path="/legal/map-policy" element={<MapPolicy />} />
          <Route path="/legal/warranty" element={<Terms />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
