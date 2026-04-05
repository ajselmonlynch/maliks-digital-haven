import { Link } from "react-router-dom";
import { ShoppingCart, Zap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCartStore } from "@/stores/cartStore";

interface UpsellEngineProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const UpsellEngine = ({
  products,
  title = "Frequently Bought Together",
  subtitle = "Customers who bought this item also added these to complete their system.",
}: UpsellEngineProps) => {
  const addItem = useCartStore((s) => s.addItem);

  if (products.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="section-label">{title}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground mb-6 max-w-xl">{subtitle}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="relative flex gap-3 p-4 border border-border bg-card rounded-sm hover:border-primary/40 transition-all"
          >
            {/* Connector "+" between items */}
            {idx < products.length - 1 && (
              <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 bg-secondary border border-border rounded-full items-center justify-center">
                <Plus size={10} className="text-muted-foreground" />
              </div>
            )}

            {/* Image placeholder */}
            <div className="w-14 h-14 bg-secondary shrink-0 flex items-center justify-center rounded-sm">
              <Zap size={18} className="text-border" />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <Link
                to={`/product/${product.handle}`}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors leading-snug line-clamp-2"
              >
                {product.name}
              </Link>
              <p className="font-mono text-sm font-bold text-foreground">
                {formatPrice(product.price)}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs border-border hover:border-primary hover:text-primary h-7"
                onClick={() => addItem(product)}
              >
                <ShoppingCart size={11} className="mr-1.5" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle CTA */}
      {products.length >= 2 && (
        <div className="mt-5 flex items-center justify-between p-4 bg-secondary/40 border border-border rounded-sm">
          <div>
            <p className="text-sm font-semibold text-foreground">Add all {products.length} items</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Total:{" "}
              <span className="font-mono font-bold text-foreground">
                {formatPrice(products.reduce((acc, p) => acc + p.price, 0))}
              </span>
            </p>
          </div>
          <Button
            size="sm"
            className="btn-primary-glow text-xs font-semibold"
            onClick={() => products.forEach((p) => addItem(p))}
          >
            <ShoppingCart size={13} className="mr-1.5" />
            Add All to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpsellEngine;
