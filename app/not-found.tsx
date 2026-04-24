import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='mt-20 min-h-[calc(100vh-80px)] bg-white'>
      <div className='mx-auto flex max-w-[1280px] items-center px-6 py-20'>
        <div className='grid w-full grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
          <div>
            <p className='text-xs uppercase tracking-[0.28em] text-[#2A2A2A]/60'>
              Error 404
            </p>

            <h1 className='mt-6 font-[var(--font-heading)] text-6xl leading-[0.95] text-[#1C1C1C] md:text-8xl'>
              Lost in
              <br />
              elegance.
            </h1>

            <p className='mt-6 max-w-[560px] text-base leading-relaxed text-[#2A2A2A]/75 md:text-lg'>
              The page you’re looking for doesn’t exist, was moved, or has
              quietly slipped away.
            </p>

            <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
              <Link
                href='/'
                className='inline-flex items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'
              >
                Back home
              </Link>

              <Link
                href='/shop'
                className='inline-flex items-center justify-center rounded-full border border-[#1C1C1C]/15 px-8 py-4 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] transition hover:bg-[#F9F6F2]'
              >
                Visit shop
              </Link>
            </div>
          </div>

          <div className='relative overflow-hidden rounded-[36px] border border-[#1C1C1C]/10 bg-[#F9F6F2] p-10'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,231,194,0.9),transparent_45%)]' />

            <div className='relative'>
              <div className='inline-flex rounded-full border border-[#1C1C1C]/10 px-5 py-2 text-xs uppercase tracking-[0.22em] text-[#2A2A2A]/70'>
                Berréa
              </div>

              <div className='mt-10 grid grid-cols-2 gap-4'>
                <div className='rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/55'>
                    Status
                  </p>
                  <p className='mt-3 text-3xl text-[#1C1C1C]'>404</p>
                </div>

                <div className='rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/55'>
                    Mood
                  </p>
                  <p className='mt-3 text-lg text-[#1C1C1C]'>Still chic</p>
                </div>

                <div className='col-span-2 rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'>
                  <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/55'>
                    Suggestion
                  </p>
                  <p className='mt-3 text-sm leading-relaxed text-[#2A2A2A]/75'>
                    Explore our handcrafted collection or return to the home
                    page.
                  </p>
                </div>
              </div>

              <p className='mt-8 text-xs uppercase tracking-[0.24em] text-[#2A2A2A]/55'>
                Crafted for Beautiful Bathrooms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
