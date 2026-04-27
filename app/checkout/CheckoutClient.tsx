'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/CartProvider';
import { formatRsdPrice } from '@/lib/cartUtils';
import { formatPrice } from '@/lib/formatPrice';
import { productImages } from '@/lib/productImages';

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, count, clear } = useCart();

  const shipping = count > 0 ? 350 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (items.length === 0) return;

    const orderNumber = `BR-${Date.now().toString().slice(-6)}`;

    clear();

    router.push(`/checkout/success?order=${orderNumber}`);
  };

  if (items.length === 0) {
    return (
      <main className='mt-20 bg-white'>
        <div className='mx-auto max-w-[1280px] px-6 py-20'>
          <div className='rounded-3xl border border-[#1C1C1C]/10 p-10'>
            <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
              Checkout
            </p>

            <h1 className='mt-5 font-[var(--font-heading)] text-5xl text-[#1C1C1C]'>
              Your bag is empty.
            </h1>

            <Link
              href='/shop'
              className='mt-8 inline-flex rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white'
            >
              Go to shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='mt-20 bg-white'>
      <div className='mx-auto max-w-[1280px] px-6 py-20'>
        <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
          Demo checkout
        </p>

        <h1 className='mt-5 font-[var(--font-heading)] text-5xl leading-tight text-[#1C1C1C] md:text-6xl'>
          Checkout.
        </h1>

        <p className='mt-5 max-w-[620px] text-base leading-relaxed text-[#2A2A2A]/75'>
          This is a demo checkout. No real payment will be processed.
        </p>

        <form
          onSubmit={handleSubmit}
          className='mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]'
        >
          <div className='space-y-10'>
            <section className='rounded-3xl border border-[#1C1C1C]/10 p-6 md:p-8'>
              <h2 className='font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
                Contact information
              </h2>

              <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <input
                  required
                  type='email'
                  placeholder='Email address'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40'
                />

                <input
                  required
                  type='tel'
                  placeholder='Phone number'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40'
                />
              </div>
            </section>

            <section className='rounded-3xl border border-[#1C1C1C]/10 p-6 md:p-8'>
              <h2 className='font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
                Shipping details
              </h2>

              <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <input
                  required
                  placeholder='First name'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40'
                />

                <input
                  required
                  placeholder='Last name'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40'
                />

                <input
                  required
                  placeholder='Address'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40 md:col-span-2'
                />

                <input
                  required
                  placeholder='City'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40'
                />

                <input
                  required
                  placeholder='Postal code'
                  className='rounded-full border border-[#1C1C1C]/10 px-5 py-4 text-sm outline-none transition focus:border-[#1C1C1C]/40'
                />
              </div>
            </section>

            <section className='rounded-3xl border border-[#1C1C1C]/10 p-6 md:p-8'>
              <h2 className='font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
                Payment method
              </h2>

              <div className='mt-6 rounded-2xl border border-[#1C1C1C]/10 bg-[#F9F6F2] p-5'>
                <p className='text-sm font-medium text-[#1C1C1C]'>
                  Cash on delivery / Demo payment
                </p>

                <p className='mt-2 text-sm leading-relaxed text-[#2A2A2A]/70'>
                  This payment option is used only for portfolio demonstration.
                </p>
              </div>
            </section>
          </div>

          <aside className='h-fit rounded-3xl border border-[#1C1C1C]/10 p-6 lg:sticky lg:top-28'>
            <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
              Order summary
            </p>

            <div className='mt-6 space-y-5'>
              {items.map(({ product, qty }) => (
                <div key={product.id} className='flex gap-4'>
                  <div className='relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F6F2EC]'>
                    <Image
                      src={productImages[product.slug] || '/placeholder.png'}
                      alt='product image'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='flex flex-1 justify-between gap-4'>
                    <div>
                      <p className='font-[var(--font-heading)] text-lg leading-tight text-[#1C1C1C]'>
                        {product.name}
                      </p>

                      <p className='mt-1 text-sm text-[#2A2A2A]/60'>
                        Qty: {qty}
                      </p>
                    </div>

                    <p className='text-sm text-[#1C1C1C]'>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 h-px bg-[#1C1C1C]/10' />

            <div className='mt-6 space-y-3'>
              <div className='flex justify-between text-sm'>
                <span className='text-[#2A2A2A]/70'>Subtotal</span>
                <span className='text-[#1C1C1C]'>
                  {formatRsdPrice(subtotal)}
                </span>
              </div>

              <div className='flex justify-between text-sm'>
                <span className='text-[#2A2A2A]/70'>Shipping</span>
                <span className='text-[#1C1C1C]'>
                  {formatRsdPrice(shipping)}
                </span>
              </div>

              <div className='flex justify-between pt-4 text-base'>
                <span className='text-[#1C1C1C]'>Total</span>
                <span className='text-[#1C1C1C]'>{formatRsdPrice(total)}</span>
              </div>
            </div>

            <button
              type='submit'
              className='mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'
            >
              Place order
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}
