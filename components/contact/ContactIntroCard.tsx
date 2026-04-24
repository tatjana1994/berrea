import ContactInfoCards from './ContactInfoCards';

export default function ContactIntroCard() {
  return (
    <div className='rounded-3xl border border-[#1C1C1C]/10 p-6 md:p-8'>
      <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
        Contact details
      </p>

      <h2 className='mt-5 font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
        We’re here to help.
      </h2>

      <p className='mt-4 text-sm leading-relaxed text-[#2A2A2A]/80'>
        Reach out for product questions, custom orders, collaborations, or
        delivery details.
      </p>

      <div className='mt-8'>
        <ContactInfoCards />
      </div>
    </div>
  );
}
