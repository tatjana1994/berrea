import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-[#1C1C1C] text-[#FFE7C2]'>
      <div className='max-w-[1280px] mx-auto px-6 py-16'>
        <div className='flex flex-col items-center text-center gap-8'>
          <Link href='/' aria-label='berréa home'>
            <Image
              src='/logo.png'
              alt='Berréa logo'
              width={140}
              height={140}
              className='hover:opacity-90 transition'
              priority
            />
          </Link>

          <nav aria-label='Footer navigation'>
            <ul className='flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.25em]'>
              <li>
                <Link href='/shop' className='hover:opacity-80 transition'>
                  Shop
                </Link>
              </li>
              <li>
                <Link href='/about-us' className='hover:opacity-80 transition'>
                  About
                </Link>
              </li>
              <li>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:opacity-80 transition'
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link href='/contact' className='hover:opacity-80 transition'>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className='mt-12 h-px w-full bg-[#FFE7C2]/15' />

        <div className='mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFE7C2]/80'>
          <p>© {new Date().getFullYear()} Berréa. All rights reserved.</p>
          <p className='tracking-[0.18em] uppercase'>
            Crafted for Beautiful Bathrooms.
          </p>
        </div>
      </div>
    </footer>
  );
}
