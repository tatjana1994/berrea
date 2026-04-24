'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from './cart/CartProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { count } = useCart();

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // scroll down
          setShowHeader(false);
        } else {
          // scroll up
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-transform duration-400 z-50 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.png'
            alt='Berréa logo'
            width={70}
            height={70}
            priority
          />
        </Link>

        <nav className='hidden md:flex items-center gap-12 text-sm uppercase tracking-[0.2em] text-[#1C1C1C]'>
          <Link href='/shop' className='hover:opacity-70 transition'>
            Shop
          </Link>
          <Link href='/about-us' className='hover:opacity-70 transition'>
            About
          </Link>
          <Link href='/contact' className='hover:opacity-70 transition'>
            Contact
          </Link>
        </nav>

        <div className='flex items-center gap-6'>
          <Link href='/cart' className='relative inline-flex'>
            <ShoppingBag
              size={24}
              strokeWidth={1.5}
              className='text-[#1C1C1C]'
            />

            {count > 0 && (
              <span className='absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white'>
                {count}
              </span>
            )}
          </Link>

          <button className='md:hidden' onClick={() => setOpen(!open)}>
            {open ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
