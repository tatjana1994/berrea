import { Leaf, Droplets, FlaskConical } from 'lucide-react';

export default function ValuesSection() {
  const items = [
    {
      title: 'Natural Oils',
      text: 'A gentle blend of plant-based oils for a soft, clean finish.',
      icon: <Leaf strokeWidth={1.2} size={36} />,
    },
    {
      title: 'Clean Ingredients',
      text: 'No unnecessary additives — just what your skin actually needs.',
      icon: <Droplets strokeWidth={1.2} size={36} />,
    },
    {
      title: 'Small Batch Production',
      text: 'Hand-poured in small runs to keep quality consistent and personal.',
      icon: <FlaskConical strokeWidth={1.2} size={36} />,
    },
  ];

  return (
    <section className='bg-[#FFE7C2]'>
      <div className='max-w-[1200px] mx-auto px-6 py-28'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-16'>
          {items.map((item) => (
            <div key={item.title} className='text-center space-y-6'>
              <div className='flex justify-center text-[#1C1C1C]'>
                {item.icon}
              </div>

              <h3 className='font-[var(--font-heading)] text-2xl text-[#1C1C1C]'>
                {item.title}
              </h3>

              <p className='text-sm text-[#2A2A2A]/80 leading-relaxed max-w-[260px] mx-auto'>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
