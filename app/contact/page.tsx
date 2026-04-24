import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className='bg-white mt-20'>
      <div className='max-w-[1280px] mx-auto px-6 py-20'>
        <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10'>
          <div>
            <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
              Contact
            </p>
            <h1 className='mt-6 font-[var(--font-heading)] text-5xl md:text-6xl leading-tight text-[#1C1C1C]'>
              Let’s talk.
            </h1>
            <p className='mt-5 text-base md:text-lg text-[#2A2A2A] max-w-[620px] leading-relaxed'>
              Questions about products, collaborations, or custom requests? Send
              us a message and we’ll get back to you soon.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-[520px]'>
            <div className='rounded-2xl border border-[#1C1C1C]/10 p-6'>
              <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Email
              </p>
              <p className='mt-3 text-sm text-[#1C1C1C]'>hello@yourshop.com</p>
              <p className='mt-2 text-xs text-[#2A2A2A]/70'>
                Mon–Fri, 9:00–17:00
              </p>
            </div>

            <div className='rounded-2xl border border-[#1C1C1C]/10 p-6'>
              <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Phone
              </p>
              <p className='mt-3 text-sm text-[#1C1C1C]'>+381 60 000 000</p>
              <p className='mt-2 text-xs text-[#2A2A2A]/70'>Support & orders</p>
            </div>

            <div className='rounded-2xl border border-[#1C1C1C]/10 p-6 sm:col-span-2'>
              <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Address
              </p>
              <p className='mt-3 text-sm text-[#1C1C1C]'>Novi Sad, Serbia</p>
              <p className='mt-2 text-xs text-[#2A2A2A]/70'>
                We respond within 24–48h.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-16 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10'>
          <div className='rounded-3xl border border-[#1C1C1C]/10 p-6 sm:p-10'>
            <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
              Send a message
            </p>
            <h2 className='mt-5 font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
              We’d love to hear from you.
            </h2>
            <p className='mt-4 text-sm text-[#2A2A2A]/80 leading-relaxed'>
              Fill in the form and we’ll reply to your email. If it’s urgent,
              call us.
            </p>

            <div className='mt-10'>
              <ContactForm />
            </div>
          </div>

          <aside className='space-y-6'>
            <div className='rounded-3xl border border-[#1C1C1C]/10 overflow-hidden'>
              <div className='p-6'>
                <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                  Location
                </p>
                <p className='mt-3 text-sm text-[#2A2A2A]/80'>
                  Swap this map with your exact address when ready.
                </p>
              </div>

              <div className='relative aspect-[4/3] bg-[#F6F2EC]' />
            </div>

            <div className='rounded-3xl border border-[#1C1C1C]/10 p-6'>
              <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Quick questions
              </p>

              <div className='mt-5 space-y-4'>
                <div>
                  <p className='text-sm text-[#1C1C1C]'>
                    Do you ship internationally?
                  </p>
                  <p className='mt-2 text-sm text-[#2A2A2A]/80'>
                    Not yet. For now we ship locally — ask us and we’ll help.
                  </p>
                </div>
                <div className='h-px bg-[#1C1C1C]/10' />
                <div>
                  <p className='text-sm text-[#1C1C1C]'>
                    Can I request custom pieces?
                  </p>
                  <p className='mt-2 text-sm text-[#2A2A2A]/80'>
                    Yes — share what you need and we’ll confirm options and
                    timing.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
