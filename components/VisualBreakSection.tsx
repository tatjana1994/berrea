import Image from 'next/image';

type VisualBreakSectionProps = {
  imageSrc?: string;
  imageAlt?: string;
};

export default function VisualBreakSection({
  imageSrc = '/visual-break.png',
  imageAlt = 'BERRÉA visual break',
}: VisualBreakSectionProps) {
  return (
    <section className='relative w-full h-[50vh] min-h-[420px] overflow-hidden'>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/25' />

      <div className='absolute inset-0 max-w-[1280px] mx-auto flex items-center justify-start px-6'>
        <div className='text-left'>
          <p className='font-[var(--font-heading)] text-4xl md:text-5xl text-white tracking-[0.08em] leading-tight'>
            A daily ritual.
            <br />
            Elevated.
          </p>

          <div className='mt-10 flex justify-start'>
            <span className='h-px w-44 bg-white/50' />
          </div>
        </div>
      </div>
    </section>
  );
}
