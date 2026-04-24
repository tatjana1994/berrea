import AboutBrandSection from '@/components/AboutBrandSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ValuesSection from '@/components/ValuesSection';
import VisualBreakSection from '@/components/VisualBreakSection';
import { fetchFeaturedProducts } from '@/lib/wp';

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
