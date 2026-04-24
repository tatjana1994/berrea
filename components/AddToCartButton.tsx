'use client';

import { useCart } from '@/components/cart/CartProvider';
import type { ProductCardData } from '@/lib/types';

type AddToCartButtonProps = {
  product: ProductCardData;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { add } = useCart();

  return (
    <button
      type='button'
      onClick={() => add(product)}
      className='inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90 sm:w-auto'
    >
      Add to cart
    </button>
  );
}
