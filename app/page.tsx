import type { Metadata } from 'next';
import AboutBrandSection from '@/components/AboutBrandSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ValuesSection from '@/components/ValuesSection';
import VisualBreakSection from '@/components/VisualBreakSection';
import { fetchFeaturedProducts } from '@/lib/wp';

export const metadata: Metadata = {
  title: 'Berréa | Handcrafted Decorative Soaps',
  description:
    'Berréa creates handcrafted decorative soaps designed to bring elegance, softness, and character to beautiful bathrooms and thoughtful gifts.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Berréa | Handcrafted Decorative Soaps',
    description:
      'Handcrafted decorative soaps crafted for beautiful bathrooms, elegant interiors, and thoughtful gifting.',
    url: '/',
    siteName: 'Berréa',
    images: [
      {
        url: '/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'Berréa handcrafted decorative soaps',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berréa | Handcrafted Decorative Soaps',
    description:
      'Handcrafted decorative soaps crafted for beautiful bathrooms, elegant interiors, and thoughtful gifting.',
    images: ['/ogimage.png'],
  },
};

export default async function Home() {
  const products = await fetchFeaturedProducts(3);

  return (
    <>
      <HeroSection />
      <AboutBrandSection />
      <FeaturedProductsSection products={products} />
      <ValuesSection />
      <VisualBreakSection imageSrc='/herobg.png' />
      <TestimonialsSection />
    </>
  );
}
