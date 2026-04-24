'use client';
import { formatPrice } from '@/lib/formatPrice';
import { ProductCardData } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: ProductCardData;
  onAddToCart?: (product: ProductCardData) => void;
};

function stripHtml(html?: string | null) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const shortDesc = stripHtml(product.description).slice(0, 80);

  return (
    <div className='group flex h-full flex-col'>
      <Link href={`/shop/${product.slug}`} className='block flex-grow'>
        {' '}
        <div className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white'>
          {product.image?.sourceUrl ? (
            <Image
              src={product.image.sourceUrl}
              alt={product.image.altText ?? product.name}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
            />
          ) : (
            <div className='absolute inset-0 flex items-center justify-center text-sm text-[#2A2A2A]/60'>
              No image
            </div>
          )}
        </div>
        <div className='mt-5 space-y-2'>
          <h3 className='font-[var(--font-heading)] text-xl text-[#1C1C1C] leading-snug'>
            {product.name}
          </h3>

          <p className='text-sm text-[#2A2A2A]/80 line-clamp-1'>
            {shortDesc || 'Crafted for Beautiful Bathrooms.'}
          </p>

          <p className='text-sm text-[#1C1C1C]'>
            {formatPrice(product.price) ?? '—'}
          </p>
        </div>
      </Link>
      <button
        type='button'
        onClick={() => onAddToCart?.(product)}
        className='cursor-pointer mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#1C1C1C] px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] transition hover:bg-[#1C1C1C] hover:text-white'
      >
        Add to cart
      </button>
    </div>
  );
}
