'use client';

import ProductCard from '@/components/ProductCard';
import { useCart } from '@/components/cart/CartProvider';
import { ProductCardData } from '@/lib/types';

type FeaturedProductsSectionProps = {
  title?: string;
  subtitle?: string;
  products: ProductCardData[];
};

export default function FeaturedProductsSection({
  title = 'Featured',
  subtitle = 'A curated selection of our best pieces.',
  products,
}: FeaturedProductsSectionProps) {
  const { add } = useCart();

  return (
    <section className='bg-[#F9F6F2]'>
      <div className='mx-auto max-w-[1280px] px-5 py-24'>
        <div className='mx-auto max-w-[720px] text-center'>
          <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
            Shop
          </p>

          <h2 className='mt-6 font-[var(--font-heading)] text-4xl leading-tight text-[#1C1C1C] md:text-5xl'>
            {title}
          </h2>

          <p className='mt-5 text-base leading-relaxed text-[#2A2A2A] md:text-lg'>
            {subtitle}
          </p>
        </div>

        <div className='mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => add(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
