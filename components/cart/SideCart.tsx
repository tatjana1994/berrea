'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useCart } from './CartProvider';
import { formatRsdPrice } from '@/lib/cartUtils';
import { formatPrice } from '@/lib/formatPrice';

export default function SideCart() {
  const {
    items,
    count,
    subtotal,
    setQty,
    remove,
    clear,
    isCartOpen,
    closeCart,
  } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[80] cursor-pointer bg-black/40 transition-opacity ${
          isCartOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[90] h-dvh w-full max-w-[460px] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.12)] transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex h-full flex-col'>
          <div className='flex items-center justify-between border-b border-[#1C1C1C]/10 px-6 py-5'>
            <div>
              <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
                Cart
              </p>

              <h2 className='mt-1 font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
                Your bag.
              </h2>
            </div>

            <button
              type='button'
              onClick={closeCart}
              className='cursor-pointer rounded-full border border-[#1C1C1C]/10 p-2 transition hover:bg-[#F9F6F2]'
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className='flex flex-1 flex-col items-start justify-center px-6'>
              <p className='text-[#2A2A2A]/80'>Your cart is empty.</p>

              <Link
                href='/shop'
                onClick={closeCart}
                className='mt-6 inline-flex cursor-pointer rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'
              >
                Go to shop
              </Link>
            </div>
          ) : (
            <>
              <div className='scrollbar-hide flex-1 overflow-y-auto px-6 py-6'>
                <div className='mb-6 flex items-center justify-between'>
                  <p className='text-sm text-[#2A2A2A]/70'>
                    {count} item{count === 1 ? '' : 's'}
                  </p>

                  <button
                    type='button'
                    onClick={clear}
                    className='cursor-pointer text-xs uppercase tracking-[0.18em] text-[#1C1C1C]/60 transition hover:text-[#1C1C1C]'
                  >
                    Clear
                  </button>
                </div>

                <div className='space-y-5'>
                  {items.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className='flex gap-4 rounded-2xl border border-[#1C1C1C]/10 p-4'
                    >
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={closeCart}
                        className='relative h-24 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-[#F6F2EC]'
                      >
                        {product.image?.sourceUrl ? (
                          <Image
                            src={product.image.sourceUrl}
                            alt={product.image.altText ?? product.name}
                            fill
                            className='object-cover'
                          />
                        ) : null}
                      </Link>

                      <div className='flex flex-1 flex-col'>
                        <div className='flex items-start justify-between gap-3'>
                          <div>
                            <Link
                              href={`/shop/${product.slug}`}
                              onClick={closeCart}
                              className='cursor-pointer font-[var(--font-heading)] text-lg leading-tight text-[#1C1C1C] transition hover:opacity-70'
                            >
                              {product.name}
                            </Link>

                            <p className='mt-2 text-sm text-[#2A2A2A]/80'>
                              {formatPrice(product.price) || '—'}
                            </p>
                          </div>

                          <button
                            type='button'
                            onClick={() => remove(product.id)}
                            className='cursor-pointer text-xs uppercase tracking-[0.16em] text-[#1C1C1C]/50 transition hover:text-[#1C1C1C]'
                          >
                            Remove
                          </button>
                        </div>

                        <div className='mt-auto pt-4'>
                          <div className='inline-flex items-center rounded-full border border-[#1C1C1C]/15'>
                            <button
                              type='button'
                              onClick={() => setQty(product.id, qty - 1)}
                              className='cursor-pointer px-4 py-2 text-sm'
                            >
                              −
                            </button>

                            <span className='px-2 text-sm'>{qty}</span>

                            <button
                              type='button'
                              onClick={() => setQty(product.id, qty + 1)}
                              className='cursor-pointer px-4 py-2 text-sm'
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border-t border-[#1C1C1C]/10 px-6 py-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-[#2A2A2A]/80'>Subtotal</span>

                  <span className='text-lg text-[#1C1C1C]'>
                    {formatRsdPrice(subtotal)}
                  </span>
                </div>

                <p className='mt-2 text-sm text-[#2A2A2A]/60'>
                  Shipping calculated at checkout.
                </p>

                <a
                  href='/cart'
                  className='mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'
                >
                  Cart
                </a>

                <Link
                  href='/shop'
                  onClick={closeCart}
                  className='mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-[#1C1C1C]/20 px-8 py-4 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] transition hover:bg-[#F9F6F2]'
                >
                  Continue shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
