import Link from 'next/link';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ order?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const order = sp.order ?? 'BR-DEMO';

  return (
    <main className='mt-20 bg-white'>
      <div className='mx-auto max-w-[900px] px-6 py-24 text-center'>
        <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
          Order placed
        </p>

        <h1 className='mt-6 font-[var(--font-heading)] text-5xl leading-tight text-[#1C1C1C] md:text-6xl'>
          Thank you for your order.
        </h1>

        <p className='mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-[#2A2A2A]/75'>
          Your demo order has been created successfully. No real payment was
          processed.
        </p>

        <div className='mx-auto mt-10 max-w-[420px] rounded-3xl border border-[#1C1C1C]/10 bg-[#F9F6F2] p-6'>
          <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/60'>
            Order number
          </p>

          <p className='mt-3 text-2xl text-[#1C1C1C]'>{order}</p>
        </div>

        <div className='mt-10 flex flex-col justify-center gap-3 sm:flex-row'>
          <Link
            href='/shop'
            className='inline-flex items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white'
          >
            Continue shopping
          </Link>

          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-full border border-[#1C1C1C]/20 px-8 py-4 text-xs uppercase tracking-[0.18em] text-[#1C1C1C]'
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
