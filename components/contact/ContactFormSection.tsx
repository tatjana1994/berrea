import ContactForm from '@/components/ContactForm';

export default function ContactFormSection() {
  return (
    <div className='rounded-3xl border border-[#1C1C1C]/10 p-6 sm:p-10'>
      <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
        Send a message
      </p>

      <h2 className='mt-5 font-[var(--font-heading)] text-3xl text-[#1C1C1C]'>
        We’d love to hear from you.
      </h2>

      <p className='mt-4 text-sm leading-relaxed text-[#2A2A2A]/80'>
        Fill in the form and we’ll reply to your email. If it’s urgent, call us.
      </p>

      <div className='mt-10'>
        <ContactForm />
      </div>
    </div>
  );
}
