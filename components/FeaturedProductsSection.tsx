import ProductCard, { ProductCardData } from '@/components/ProductCard';

type FeaturedProductsSectionProps = {
  title?: string;
  subtitle?: string;
  products: ProductCardData[];
  onAddToCart?: (product: ProductCardData) => void;
};

export default function FeaturedProductsSection({
  title = 'Featured',
  subtitle = 'A curated selection of our best pieces.',
  products,
  onAddToCart,
}: FeaturedProductsSectionProps) {
  return (
    <section className='bg-[#F9F6F2]'>
      <div className='max-w-[1280px] mx-auto px-5 py-24'>
        <div className='text-center max-w-[720px] mx-auto'>
          <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
            Shop
          </p>

          <h2 className='mt-6 font-[var(--font-heading)] text-4xl md:text-5xl leading-tight text-[#1C1C1C]'>
            {title}
          </h2>

          <p className='mt-5 text-base md:text-lg leading-relaxed text-[#2A2A2A]'>
            {subtitle}
          </p>
        </div>

        <div className='mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
