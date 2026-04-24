export default function ContactFaqCard() {
  return (
    <div className='rounded-3xl border border-[#1C1C1C]/10 p-6'>
      <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
        Quick questions
      </p>

      <div className='mt-5 space-y-4'>
        <div>
          <p className='text-sm text-[#1C1C1C]'>Do you ship internationally?</p>
          <p className='mt-2 text-sm text-[#2A2A2A]/80'>
            Not yet. For now we ship locally — ask us and we’ll help.
          </p>
        </div>

        <div className='h-px bg-[#1C1C1C]/10' />

        <div>
          <p className='text-sm text-[#1C1C1C]'>Can I request custom pieces?</p>
          <p className='mt-2 text-sm text-[#2A2A2A]/80'>
            Yes — share what you need and we’ll confirm options and timing.
          </p>
        </div>
      </div>
    </div>
  );
}
