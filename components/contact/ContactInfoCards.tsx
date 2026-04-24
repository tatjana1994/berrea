export default function ContactInfoCards() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      <div className='rounded-2xl border border-[#1C1C1C]/10 p-6'>
        <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
          Email
        </p>
        <p className='mt-3 text-sm text-[#1C1C1C]'>hello@yourshop.com</p>
        <p className='mt-2 text-xs text-[#2A2A2A]/70'>Mon–Fri, 9:00–17:00</p>
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
  );
}
