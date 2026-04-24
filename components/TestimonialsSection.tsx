'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

type Testimonial = {
  quote: string;
  name: string;
};

const TESTIMONIALS: Testimonial[] = [
  { quote: 'Absolutely beautiful and smells divine.', name: 'Ana M.' },
  {
    quote: 'Looks like a design object — guests always ask where it’s from.',
    name: 'Milica P.',
  },
  {
    quote: 'The texture is perfect and it elevates my bathroom instantly.',
    name: 'Jelena R.',
  },
  {
    quote: 'Minimal, elegant, and surprisingly long-lasting.',
    name: 'Tamara S.',
  },
  {
    quote: 'Packaging is gorgeous. This is my go-to gift now.',
    name: 'Ivana K.',
  },
  {
    quote: 'A small ritual that feels genuinely luxurious.',
    name: 'Marija D.',
  },
  {
    quote: 'The scent is subtle, clean, and not overpowering at all.',
    name: 'Sofija N.',
  },
  {
    quote: 'Finally a soap that looks as good as it feels.',
    name: 'Katarina J.',
  },
];

export default function TestimonialsSection() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    mode: 'free-snap',
    rubberband: true,
    slides: { origin: 'center', perView: 1.1, spacing: 20 },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { origin: 'center', perView: 2.1, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { origin: 'center', perView: 3, spacing: 28 },
      },
    },
  });

  return (
    <section className='bg-white'>
      <div className='max-w-[1280px] mx-auto px-6 py-28'>
        <div className='text-center max-w-[720px] mx-auto'>
          <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
            Reviews
          </p>

          <h2 className='mt-6 font-[var(--font-heading)] text-4xl md:text-5xl leading-tight text-[#1C1C1C]'>
            Loved by customers.
          </h2>

          <p className='mt-5 text-base md:text-lg leading-relaxed text-[#2A2A2A]'>
            A few words from people who brought BERRÉA into their daily ritual.
          </p>
        </div>

        <div className='mt-16 relative'>
          <div
            ref={sliderRef}
            className='keen-slider cursor-grab active:cursor-grabbing'
          >
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className='keen-slider__slide'>
                <div className='relative h-full rounded-3xl bg-white p-10 md:p-12 border border-[#1C1C1C]/10 shadow-[0_25px_70px_rgba(0,0,0,0.07)] transition-all duration-500  flex flex-col'>
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#FFE7C2]' />

                  <p className='relative font-[var(--font-heading)] text-2xl md:text-3xl leading-snug text-[#1C1C1C]'>
                    “{t.quote}”
                  </p>

                  <div className='mt-auto pt-10 flex items-center justify-start gap-3'>
                    <span className='h-px w-10 bg-[#1C1C1C]/25' />
                    <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
                      {t.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-12 flex items-center justify-center gap-3'>
            <button
              type='button'
              onClick={() => instanceRef.current?.prev()}
              className='rounded-full cursor-pointer border border-[#1C1C1C]/20 px-6 py-2 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition'
            >
              Prev
            </button>

            <button
              type='button'
              onClick={() => instanceRef.current?.next()}
              className='rounded-full cursor-pointer border border-[#1C1C1C]/20 px-6 py-2 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
