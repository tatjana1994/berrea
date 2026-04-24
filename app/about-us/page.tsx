import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className='bg-white'>
      <section className='relative w-full h-[70vh] min-h-[500px] overflow-hidden'>
        <Image
          src='/herobg.png'
          alt='Berréa handcrafted soap'
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/15' />
      </section>

      <section className='max-w-[900px] mx-auto px-6 py-28 text-center'>
        <h1 className='font-[var(--font-heading)] text-5xl md:text-6xl text-[#1C1C1C] leading-tight'>
          About Berréa.
        </h1>

        <div className='mt-16 space-y-8 text-lg leading-relaxed text-[#2A2A2A]'>
          <p>
            Berréa was born from a simple idea — that everyday objects can be
            both functional and beautiful. What began as an exploration of form
            and texture evolved into a collection of handcrafted soaps inspired
            by nature’s quiet elegance.
          </p>

          <p>
            Each piece is sculpted by hand in small batches, shaped to resemble
            organic clusters and finished with a clean, minimal formulation. We
            believe that even the most ordinary rituals deserve thoughtful
            design.
          </p>

          <p>
            Berréa is not just soap. It is a daily pause. A tactile experience.
            A subtle statement in the spaces you inhabit.
          </p>
        </div>

        <div className='mt-20 flex justify-center'>
          <span className='h-px w-24 bg-[#1C1C1C]/20' />
        </div>
      </section>
    </main>
  );
}
