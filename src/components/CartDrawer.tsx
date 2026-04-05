import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Truck, Zap } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/products";

const FREE_FREIGHT_THRESHOLD = 3000;

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQty, removeItem } = useCartStore();

  const itemCount = items.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  const freeFreightRemaining = Math.max(0, FREE_FREIGHT_THRESHOLD - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative border-border hover:border-primary hover:text-primary"
          aria-label={`Cart (${itemCount} items)`}
        >
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-0">
              {itemCount > 9 ? "9+" : itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-card border-border p-0">
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-mono text-sm tracking-wide uppercase">
              Cart
              {itemCount > 0 && (
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="p-4 bg-secondary rounded-sm">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Build your solar system
                </p>
              </div>
              <Button
                asChild
                className="btn-primary-glow mt-2"
                onClick={() => setIsOpen(false)}
              >
                <Link to="/products">Shop Systems</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Free freight progress */}
              {freeFreightRemaining > 0 && (
                <div className="px-5 py-3 bg-secondary/60 border-b border-border shrink-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <Truck size={12} className="text-primary shrink-0" />
                    <span>
                      Add{" "}
                      <span className="font-mono font-semibold text-foreground">
                        {formatPrice(freeFreightRemaining)}
                      </span>{" "}
                      more for free freight
                    </span>
                  </div>
                  <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min(100, (subtotal / FREE_FREIGHT_THRESHOLD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
              {freeFreightRemaining === 0 && (
                <div className="px-5 py-2 bg-primary/10 border-b border-primary/20 shrink-0">
                  <p className="text-xs text-primary flex items-center gap-1.5">
                    <Truck size={11} />
                    Free freight unlocked on your order!
                  </p>
                </div>
              )}

              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 pb-4 border-b border-border last:border-0"
                  >
                    {/* Image placeholder */}
                    <div className="w-16 h-16 bg-secondary shrink-0 flex items-center justify-center rounded-sm overflow-hidden">
                      <Zap size={20} className="text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                        {item.product.name}
                      </p>
                      <p className="font-mono text-sm font-semibold text-foreground mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                      {item.product.freightNote && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Freight shipping
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>

                      <div className="flex items-center gap-1.5 border border-border rounded-sm">
                        <button
                          onClick={() => updateQty(item.product.id, item.qty - 1)}
                          className="p-1 hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-mono text-xs w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.qty + 1)}
                          className="p-1 hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="shrink-0 px-5 py-4 border-t border-border space-y-3 bg-card">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-mono font-bold text-lg text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping & tax calculated at checkout.
                </p>

                <Button
                  asChild
                  className="w-full btn-primary-glow h-11 font-semibold tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/cart">
                    View Cart & Checkout <ArrowRight className="ml-2" size={15} />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to="/financing">Apply for 0% Financing</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
