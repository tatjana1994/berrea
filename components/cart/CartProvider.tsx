'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CartItem, CartProduct } from '@/lib/cartTypes';
import { parsePriceToNumber } from '@/lib/cartUtils';

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (product: CartProduct, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'shop_cart_v1';

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const add: CartContextValue['add'] = (product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.id === product.id);

      if (i === -1) {
        return [...prev, { product, qty }];
      }

      const copy = [...prev];

      copy[i] = {
        ...copy[i],
        qty: copy[i].qty + qty,
      };

      return copy;
    });

    setIsCartOpen(true);
  };

  const remove: CartContextValue['remove'] = (productId) => {
    setItems((prev) => prev.filter((x) => x.product.id !== productId));
  };

  const setQty: CartContextValue['setQty'] = (productId, qty) => {
    const safe = Math.max(1, qty);

    setItems((prev) =>
      prev.map((x) => (x.product.id === productId ? { ...x, qty: safe } : x)),
    );
  };

  const clear = () => {
    setItems([]);
  };

  const count = useMemo(
    () => items.reduce((sum, x) => sum + x.qty, 0),
    [items],
  );

  const subtotal = useMemo(() => {
    return items.reduce((sum, x) => {
      const price = parsePriceToNumber(x.product.price);

      return sum + price * x.qty;
    }, 0);
  }, [items]);

  const value: CartContextValue = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      add,
      remove,
      setQty,
      clear,
    }),
    [items, count, subtotal, isCartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within <CartProvider>');
  }

  return ctx;
}
