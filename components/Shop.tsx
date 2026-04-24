import Link from 'next/link';
import { GET_ALL_PRODUCTS } from '@/lib/queries';
import { getWpClient } from '@/lib/wp';
import type { AllProductsResponse, ProductCardData } from '@/lib/types';
import ProductGridClient from './ProductGridClient';

const PER_PAGE = 12;
const MAX_PRODUCTS = 200;

function sortProducts(products: ProductCardData[], sort: string) {
  const copy = [...products];
  if (sort === 'az') copy.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'za') copy.sort((a, b) => b.name.localeCompare(a.name));
  return copy;
}

export default async function Shop({
  searchParams,
}: {
  searchParams?: Promise<{ sort?: string; page?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const sort = sp.sort ?? 'az';
  const page = Math.max(1, Number(sp.page ?? '1') || 1);

  const client = getWpClient();
  const data = await client.request<AllProductsResponse>(GET_ALL_PRODUCTS, {
    first: MAX_PRODUCTS,
  });

  const allSorted = sortProducts(data.products.nodes, sort);

  const totalPages = Math.max(1, Math.ceil(allSorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const products = allSorted.slice(start, end);

  const hasPrev = safePage > 1;
  const hasNext = safePage < totalPages;

  const prevHref = `/shop?page=${safePage - 1}&sort=${sort}`;
  const nextHref = `/shop?page=${safePage + 1}&sort=${sort}`;

  return (
    <div className='bg-white'>
      <div className='max-w-[1280px] mx-auto px-6 py-20'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-8'>
          <div>
            <h1 className='mt-6 font-[var(--font-heading)] text-5xl md:text-6xl leading-tight text-[#1C1C1C]'>
              The Collection.
            </h1>
            <p className='mt-5 text-base md:text-lg text-[#2A2A2A] max-w-[560px] leading-relaxed'>
              Handcrafted pieces designed to elevate everyday spaces.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <span className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
              Sort
            </span>

            <div className='flex rounded-full border border-[#1C1C1C]/20 overflow-hidden'>
              <Link
                href={`/shop?page=${safePage}&sort=az`}
                className={`px-5 py-2 text-xs uppercase tracking-[0.18em] transition ${
                  sort === 'az'
                    ? 'bg-[#1C1C1C] text-white'
                    : 'text-[#1C1C1C] hover:bg-[#F9F6F2]'
                }`}
              >
                A–Z
              </Link>
              <Link
                href={`/shop?page=${safePage}&sort=za`}
                className={`px-5 py-2 text-xs uppercase tracking-[0.18em] transition ${
                  sort === 'za'
                    ? 'bg-[#1C1C1C] text-white'
                    : 'text-[#1C1C1C] hover:bg-[#F9F6F2]'
                }`}
              >
                Z–A
              </Link>
            </div>
          </div>
        </div>

        <ProductGridClient products={products} />

        <div className='mt-10 flex items-center justify-center gap-4'>
          <Link
            href={prevHref}
            aria-disabled={!hasPrev}
            className={`rounded-full border px-6 py-3 text-xs uppercase tracking-[0.18em] transition ${
              hasPrev
                ? 'border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white'
                : 'border-[#1C1C1C]/10 text-[#1C1C1C]/40 pointer-events-none'
            }`}
          >
            Prev
          </Link>

          <span className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
            Page {safePage} / {totalPages}
          </span>

          <Link
            href={nextHref}
            aria-disabled={!hasNext}
            className={`rounded-full border px-6 py-3 text-xs uppercase tracking-[0.18em] transition ${
              hasNext
                ? 'border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white'
                : 'border-[#1C1C1C]/10 text-[#1C1C1C]/40 pointer-events-none'
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
