'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { formatMoney } from '@/lib/cartUtils';

export default function CartPage() {
  const { items, subtotal, count, setQty, remove, clear } = useCart();

  return (
    <main className='bg-white mt-20'>
      <div className='max-w-[1280px] mx-auto px-6 py-20'>
        <div className='flex items-end justify-between gap-6'>
          <div>
            <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
              Cart
            </p>
            <h1 className='mt-6 font-[var(--font-heading)] text-5xl md:text-6xl leading-tight text-[#1C1C1C]'>
              Your bag.
            </h1>
            <p className='mt-5 text-base md:text-lg text-[#2A2A2A]'>
              {count} item{count === 1 ? '' : 's'}
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clear}
              className='text-xs uppercase tracking-[0.18em] text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className='mt-16 rounded-2xl border border-[#1C1C1C]/10 p-10'>
            <p className='text-[#2A2A2A]/80'>Your cart is empty.</p>
            <Link
              href='/shop'
              className='mt-6 inline-flex rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white'
            >
              Go to shop
            </Link>
          </div>
        ) : (
          <div className='mt-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10'>
            <div className='space-y-6'>
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className='flex gap-5 rounded-2xl border border-[#1C1C1C]/10 p-5'
                >
                  <div className='relative h-28 w-24 overflow-hidden rounded-xl bg-[#F6F2EC]'>
                    {product.image?.sourceUrl ? (
                      <Image
                        src={product.image.sourceUrl}
                        alt={product.image.altText ?? product.name}
                        fill
                        className='object-cover'
                      />
                    ) : null}
                  </div>

                  <div className='flex flex-1 flex-col'>
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <Link
                          href={`/shop/${product.slug}`}
                          className='font-[var(--font-heading)] text-lg text-[#1C1C1C]'
                        >
                          {product.name}
                        </Link>
                        <p className='mt-2 text-sm text-[#2A2A2A]/80'>
                          {product.price ?? '—'}
                        </p>
                      </div>

                      <button
                        onClick={() => remove(product.id)}
                        className='text-xs uppercase tracking-[0.18em] text-[#1C1C1C]/60 hover:text-[#1C1C1C]'
                      >
                        Remove
                      </button>
                    </div>

                    <div className='mt-auto flex items-center justify-between'>
                      <div className='inline-flex items-center rounded-full border border-[#1C1C1C]/15'>
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className='px-4 py-2 text-sm'
                          aria-label='Decrease quantity'
                        >
                          −
                        </button>
                        <span className='px-3 text-sm'>{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className='px-4 py-2 text-sm'
                          aria-label='Increase quantity'
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className='h-fit rounded-2xl border border-[#1C1C1C]/10 p-6'>
              <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Summary
              </p>

              <div className='mt-6 flex items-center justify-between'>
                <span className='text-sm text-[#2A2A2A]/80'>Subtotal</span>
                <span className='text-sm text-[#1C1C1C]'>
                  {formatMoney(subtotal)}
                </span>
              </div>

              <div className='mt-3 flex items-center justify-between'>
                <span className='text-sm text-[#2A2A2A]/80'>Shipping</span>
                <span className='text-sm text-[#1C1C1C]'>
                  Calculated at checkout
                </span>
              </div>

              <div className='mt-6 h-px bg-[#1C1C1C]/10' />

              <div className='mt-6 flex items-center justify-between'>
                <span className='text-sm text-[#2A2A2A]/80'>Total</span>
                <span className='text-lg text-[#1C1C1C]'>
                  {formatMoney(subtotal)}
                </span>
              </div>

              <button className='mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'>
                Checkout
              </button>

              <Link
                href='/shop'
                className='mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#1C1C1C]/20 px-8 py-4 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] transition hover:bg-[#F9F6F2]'
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
