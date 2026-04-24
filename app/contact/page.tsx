import ContactHero from '@/components/contact/ContactHero';
import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactIntroCard from '@/components/contact/ContactIntroCard';
import ContactFaqCard from '@/components/contact/ContactFaqCard';

export default function ContactPage() {
  return (
    <main className='mt-20 bg-white'>
      <div className='mx-auto max-w-[1280px] px-6 py-20'>
        <ContactHero />

        <div className='mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_460px]'>
          <ContactFormSection />

          <aside className='space-y-6'>
            <ContactIntroCard />
            <ContactFaqCard />
          </aside>
        </div>
      </div>
    </main>
  );
}
