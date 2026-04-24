export default function AboutBrandSection() {
  return (
    <section className='bg-white'>
      <div className='max-w-[900px] mx-auto px-5 py-24 text-center'>
        <p className='text-xs uppercase tracking-[0.25em] text-brand-text/70'>
          Our Story
        </p>

        <h2 className='mt-6 font-[var(--font-heading)] text-4xl md:text-5xl leading-tight text-brand-dark'>
          Crafted with Intention.
        </h2>

        <p className='mt-6 text-base md:text-lg leading-relaxed text-brand-text max-w-[720px] mx-auto'>
          Berréa soaps are cold-processed and carefully shaped to resemble
          natural clusters, transforming soap into a tactile design object.
        </p>

        <div className='mt-12 flex justify-center'>
          <span className='h-px w-24 bg-brand-dark/20' />
        </div>
      </div>
    </section>
  );
}
