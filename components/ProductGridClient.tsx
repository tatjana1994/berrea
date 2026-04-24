'use client';

import ProductCard from '@/components/ProductCard';
import type { ProductCardData } from '@/lib/types';
import { useCart } from '@/components/cart/CartProvider';

export default function ProductGridClient({
  products,
}: {
  products: ProductCardData[];
}) {
  const cart = useCart();

  return (
    <div className='mt-16 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={(prod) =>
            cart.add({
              id: prod.id,
              slug: prod.slug,
              name: prod.name,
              price: prod.price ?? null,
              image: prod.image ?? null,
            })
          }
        />
      ))}
    </div>
  );
}
