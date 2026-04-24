'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from './cart/CartProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => {
    const controlHeader = () => {
      if (open) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlHeader, { passive: true });

    return () => window.removeEventListener('scroll', controlHeader);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinkClass = (href: string) =>
    `border-b pb-1 transition ${
      pathname === href
        ? 'border-[#1C1C1C] text-[#1C1C1C]'
        : 'border-transparent text-[#1C1C1C] hover:border-[#1C1C1C]/30'
    }`;

  return (
    <>
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

          <nav className='hidden items-center gap-12 text-sm uppercase tracking-[0.2em] md:flex'>
            <Link href='/shop' className={navLinkClass('/shop')}>
              Shop
            </Link>

            <Link href='/about-us' className={navLinkClass('/about-us')}>
              About
            </Link>

            <Link href='/contact' className={navLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          <div className='flex items-center gap-6'>
            <button
              type='button'
              onClick={openCart}
              className='relative inline-flex cursor-pointer'
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
              className='cursor-pointer md:hidden'
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className='fixed inset-0 z-[60] flex h-screen flex-col bg-white md:hidden'>
          <div className='flex items-center justify-between border-b border-[#1C1C1C]/10 px-6 py-4'>
            <Link href='/' onClick={() => setOpen(false)}>
              <Image src='/logo.png' alt='Berréa logo' width={70} height={70} />
            </Link>

            <div className='flex items-center gap-6'>
              <button
                type='button'
                onClick={() => {
                  setOpen(false);
                  openCart();
                }}
                className='relative inline-flex cursor-pointer'
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
                onClick={() => setOpen(false)}
                className='cursor-pointer'
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className='flex flex-1 flex-col justify-between'>
            <nav className='px-6 pt-10'>
              <div className='flex flex-col gap-8 text-lg uppercase tracking-[0.25em] text-[#1C1C1C]'>
                <Link href='/shop' onClick={() => setOpen(false)}>
                  Shop
                </Link>

                <Link href='/about-us' onClick={() => setOpen(false)}>
                  About
                </Link>

                <Link href='/contact' onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </div>
            </nav>

            <div className='bg-[#1C1C1C] px-6 py-10 text-[#FFE7C2]'>
              <p className='text-xs uppercase tracking-[0.25em]'>Berréa</p>

              <p className='mt-4 text-sm leading-relaxed text-[#FFE7C2]/80'>
                Crafted for Beautiful Bathrooms.
              </p>

              <div className='mt-8 h-px bg-[#FFE7C2]/15' />

              <div className='mt-8 space-y-3 text-xs uppercase tracking-[0.2em] text-[#FFE7C2]/70'>
                <p>Shop</p>
                <p>Luxury handmade soaps</p>
                <p>Made with care</p>
              </div>

              <p className='mt-10 text-xs text-[#FFE7C2]/60'>
                © {new Date().getFullYear()} Berréa
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
