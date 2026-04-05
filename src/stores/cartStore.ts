import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import type { Product } from '@/lib/products';

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface CartLineItem {
  product: Product;
  qty: number;
}

interface CartStore {
  items: CartLineItem[];
  abandonedAt: number | null;       // timestamp — drives recovery emails
  recoveryDismissed: boolean;

  addItem: (product: Product, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  dismissRecovery: () => void;

  // Derived helpers (computed inline in components, but exposed for convenience)
  subtotal: () => number;
  itemCount: () => number;
}

// ─── ABANDONED CART LOGIC ────────────────────────────────────────────────────
//
// Strategy: when a cart has items but no checkout action for 15 minutes,
// flag it as "abandoned" (abandonedAt timestamp set). A separate hook
// `useAbandonedCartRecovery` reads this flag and can:
//   • Show an in-app recovery banner/toast
//   • POST to a recovery email webhook (Klaviyo, Mailchimp, etc.)
//
// The `abandonedAt` value is persisted in localStorage so it survives
// page refreshes. Clear it on successful checkout or cart clear.

const ABANDONED_THRESHOLD_MS = 15 * 60 * 1000; // 15 minutes

// ─── STORE ───────────────────────────────────────────────────────────────────

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      abandonedAt: null,
      recoveryDismissed: false,

      addItem: (product, qty = 1) => {
        const { items } = get();
        const existing = items.find((i) => i.product.id === product.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
            ),
            abandonedAt: null, // reset abandoned timer on activity
          });
        } else {
          set({
            items: [...items, { product, qty }],
            abandonedAt: null,
          });
        }

        toast.success(`Added to cart`, {
          description: product.name,
        });

        // Schedule abandoned cart flag after threshold
        scheduleAbandonedFlag();
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, qty } : i
          ),
          abandonedAt: null,
        });
        scheduleAbandonedFlag();
      },

      removeItem: (productId) => {
        const next = get().items.filter((i) => i.product.id !== productId);
        set({
          items: next,
          abandonedAt: next.length > 0 ? get().abandonedAt : null,
        });
      },

      clearCart: () => {
        set({ items: [], abandonedAt: null, recoveryDismissed: false });
      },

      dismissRecovery: () => {
        set({ recoveryDismissed: true, abandonedAt: null });
      },

      subtotal: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.qty, 0),

      itemCount: () =>
        get().items.reduce((acc, i) => acc + i.qty, 0),
    }),
    {
      name: 'solarcore-cart-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        abandonedAt: state.abandonedAt,
        recoveryDismissed: state.recoveryDismissed,
      }),
    }
  )
);

// ─── ABANDONED CART SCHEDULER ─────────────────────────────────────────────────

let abandonTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleAbandonedFlag() {
  if (abandonTimer) clearTimeout(abandonTimer);
  abandonTimer = setTimeout(() => {
    const { items } = useCartStore.getState();
    if (items.length > 0) {
      useCartStore.setState({ abandonedAt: Date.now() });
      // In production: fire webhook to Klaviyo/Mailchimp here
      // Example: sendAbandonedCartWebhook(items);
    }
  }, ABANDONED_THRESHOLD_MS);
}

// ─── RECOVERY HOOK ────────────────────────────────────────────────────────────
// Use this in your root layout or _app to show recovery prompts.

export function useAbandonedCartRecovery() {
  const { abandonedAt, items, recoveryDismissed, dismissRecovery } = useCartStore();

  const isAbandoned =
    !!abandonedAt &&
    !recoveryDismissed &&
    items.length > 0 &&
    Date.now() - abandonedAt >= ABANDONED_THRESHOLD_MS;

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.qty, 0);

  return { isAbandoned, items, subtotal, dismissRecovery };
}
