import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UpsellEngine from "@/components/UpsellEngine";
import ConsultationCTA from "@/components/ConsultationCTA";
import { Button } from "@/components/ui/button";
import {
  Minus, Plus, Trash2, Truck, ShieldCheck, ArrowRight,
  ShoppingCart, Tag, Zap, Phone
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getUpsellProducts, PRODUCTS } from "@/lib/products";

const FREE_FREIGHT_THRESHOLD = 3000;

// Derive upsells from items not already in cart
function getCartUpsells(cartProductIds: string[]) {
  const allUpsellHandles = PRODUCTS.filter((p) => cartProductIds.includes(p.id))
    .flatMap((p) => p.upsells);
  const uniqueHandles = [...new Set(allUpsellHandles)];
  return getUpsellProducts(uniqueHandles).filter((p) => !cartProductIds.includes(p.id)).slice(0, 3);
}

const Cart = () => {
  const { items, updateQty, removeItem, clearCart } = useCartStore();
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  const itemCount = items.reduce((acc, i) => acc + i.qty, 0);
  const freeFreightRemaining = Math.max(0, FREE_FREIGHT_THRESHOLD - subtotal);
  const qualifiesForFreeFreight = subtotal >= FREE_FREIGHT_THRESHOLD;

  const upsells = getCartUpsells(items.map((i) => i.product.id));
  const estimatedMonthly = Math.ceil(subtotal / 60);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConsultationCTA />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <span className="section-label mb-2 block">Your Order</span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Shopping Cart
              {itemCount > 0 && (
                <span className="ml-3 font-mono text-base text-muted-foreground font-normal">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
          </div>

          {items.length === 0 ? (
            /* Empty cart */
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="p-6 bg-card border border-border rounded-sm">
                <ShoppingCart size={40} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start building your solar or grow system.
                </p>
              </div>
              <Button asChild className="btn-primary-glow">
                <Link to="/products">Browse Systems</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* ── Left: Items ─────────────────────────────────────────── */}
              <div className="lg:col-span-2 space-y-6">
                {/* Free freight bar */}
                <div className="p-4 border border-border bg-card rounded-sm">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Truck size={12} className="text-primary" />
                      {qualifiesForFreeFreight ? (
                        <span className="text-primary font-semibold">
                          Free freight unlocked on your order!
                        </span>
                      ) : (
                        <>
                          Add{" "}
                          <span className="font-mono font-semibold text-foreground">
                            {formatPrice(freeFreightRemaining)}
                          </span>{" "}
                          for free residential freight delivery
                        </>
                      )}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {formatPrice(Math.min(subtotal, FREE_FREIGHT_THRESHOLD))} /{" "}
                      {formatPrice(FREE_FREIGHT_THRESHOLD)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${Math.min(100, (subtotal / FREE_FREIGHT_THRESHOLD) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Cart items */}
                <div className="space-y-px border border-border rounded-sm overflow-hidden">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-5 bg-card hover:bg-secondary/30 transition-colors"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-secondary shrink-0 flex items-center justify-center rounded-sm">
                        <Zap size={24} className="text-border" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.handle}`}
                          className="font-semibold text-foreground hover:text-primary transition-colors leading-snug"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          SKU: {item.product.sku}
                        </p>
                        {item.product.freightNote && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Truck size={10} className="text-primary" />
                            {item.product.freightNote}
                          </p>
                        )}
                        <p className="font-mono text-sm font-bold text-foreground mt-2">
                          {formatPrice(item.product.price)}
                          {item.qty > 1 && (
                            <span className="font-normal text-muted-foreground text-xs ml-1.5">
                              × {item.qty} = {formatPrice(item.product.price * item.qty)}
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Qty + Remove */}
                      <div className="flex flex-col items-end justify-between shrink-0 gap-3">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-1 border border-border rounded-sm">
                          <button
                            onClick={() => updateQty(item.product.id, item.qty - 1)}
                            className="p-1.5 hover:text-primary transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-sm w-7 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.qty + 1)}
                            className="p-1.5 hover:text-primary transition-colors"
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsell engine */}
                {upsells.length > 0 && (
                  <div className="pt-4">
                    <UpsellEngine
                      products={upsells}
                      title="Complete Your System"
                      subtitle="Add the accessories most customers pair with their order."
                    />
                  </div>
                )}
              </div>

              {/* ── Right: Order summary ─────────────────────────────── */}
              <div className="space-y-5">
                <div className="border border-border bg-card rounded-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-border bg-secondary/60">
                    <h2 className="font-mono text-sm font-semibold tracking-wide uppercase">
                      Order Summary
                    </h2>
                  </div>

                  <div className="px-5 py-5 space-y-4">
                    {/* Line items summary */}
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground line-clamp-1 flex-1 pr-2">
                            {item.product.name}{" "}
                            {item.qty > 1 && (
                              <span className="font-mono">×{item.qty}</span>
                            )}
                          </span>
                          <span className="font-mono font-semibold text-foreground shrink-0">
                            {formatPrice(item.product.price * item.qty)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Freight Shipping</span>
                        <span className="font-mono">
                          {qualifiesForFreeFreight ? (
                            <span className="text-primary font-semibold">FREE</span>
                          ) : (
                            "Calculated at checkout"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Tax</span>
                        <span className="font-mono">Calculated at checkout</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-foreground">Subtotal</span>
                        <span className="font-mono text-2xl font-bold text-foreground">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                    </div>

                    {/* Financing note */}
                    {subtotal >= 2000 && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-secondary/60 border border-border rounded-sm">
                        <Tag size={11} className="text-primary shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          Or from{" "}
                          <span className="font-mono font-bold text-foreground">
                            ${estimatedMonthly}/mo
                          </span>{" "}
                          · 0% APR ·{" "}
                          <Link to="/financing" className="text-primary hover:underline underline-offset-2">
                            Apply
                          </Link>
                        </p>
                      </div>
                    )}

                    {/* Checkout button */}
                    <Button
                      className="w-full btn-primary-glow h-12 font-semibold tracking-wide text-base"
                      asChild
                    >
                      <Link to="/contact">
                        Proceed to Checkout <ArrowRight className="ml-2" size={15} />
                      </Link>
                    </Button>

                    {/* Trust signals */}
                    <div className="space-y-2 pt-1">
                      {[
                        { icon: ShieldCheck, text: "SSL-encrypted checkout" },
                        { icon: Truck, text: "Freight specialist — LTL & residential" },
                        { icon: Phone, text: "Expert support: (617) 555-0199" },
                      ].map((t) => (
                        <div key={t.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <t.icon size={11} className="text-primary shrink-0" />
                          {t.text}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={clearCart}
                      className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors text-center pt-1"
                    >
                      Clear cart
                    </button>
                  </div>
                </div>

                {/* MAP compliance note */}
                <div className="p-4 border border-border rounded-sm bg-secondary/30">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">MAP Price Notice:</span> All
                    prices displayed comply with Minimum Advertised Price (MAP) policies set by our
                    supplier agreements. Prices cannot be discounted below MAP.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
