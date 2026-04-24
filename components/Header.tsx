'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from './cart/CartProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const { count, openCart } = useCart();

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false);
        setOpen(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlHeader, { passive: true });

    return () => window.removeEventListener('scroll', controlHeader);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo.png'
            alt='Berréa logo'
            width={70}
            height={70}
            priority
          />
        </Link>

        <nav className='hidden items-center gap-12 text-sm uppercase tracking-[0.2em] text-[#1C1C1C] md:flex'>
          <Link href='/shop' className='transition hover:opacity-70'>
            Shop
          </Link>

          <Link href='/about-us' className='transition hover:opacity-70'>
            About
          </Link>

          <Link href='/contact' className='transition hover:opacity-70'>
            Contact
          </Link>
        </nav>

        <div className='flex items-center gap-6'>
          <button
            type='button'
            onClick={openCart}
            className='relative inline-flex'
            aria-label='Open cart'
          >
            <ShoppingBag
              size={24}
              strokeWidth={1.5}
              className='text-[#1C1C1C]'
            />

            <span
              suppressHydrationWarning
              className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1C1C1C] px-1 text-[10px] font-medium leading-none text-white transition-opacity ${
                count > 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {count > 0 ? count : ''}
            </span>
          </button>

          <button
            type='button'
            className='md:hidden'
            onClick={() => setOpen((prev) => !prev)}
            aria-label='Toggle menu'
          >
            {open ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className='border-t border-[#1C1C1C]/10 bg-white px-6 py-6 md:hidden'>
          <nav className='flex flex-col gap-5 text-sm uppercase tracking-[0.2em] text-[#1C1C1C]'>
            <Link href='/shop' onClick={() => setOpen(false)}>
              Shop
            </Link>

            <Link href='/about-us' onClick={() => setOpen(false)}>
              About
            </Link>

            <Link href='/contact' onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
