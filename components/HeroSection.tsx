import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='relative mt-20 min-h-[90vh] flex items-center overflow-hidden'>
      <Image
        src='/herobg.png'
        alt='BERRÉA hero background'
        fill
        priority
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/20' />

      <div className='relative max-w-[1280px] mx-auto w-full z-10 px-5 py-32'>
        <div className='max-w-2xl space-y-8 w-full'>
          <h1
            className='text-5xl lg:text-6xl font-bold leading-tight text-brand-text
'
          >
            Handcrafted Soap.
            <br />
            Designed for Beautiful Bathrooms.
          </h1>

          <p className='text-lg text-brand-text leading-relaxed'>
            Each BERRÉA piece is sculpted by hand, bringing elegance and ritual
            into everyday spaces.
          </p>

          <Link
            href='/shop'
            className='inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
