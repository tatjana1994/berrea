import Link from 'next/link';
import { GET_ALL_PRODUCTS } from '@/lib/queries';
import { getWpClient } from '@/lib/wp';
import type { AllProductsResponse } from '@/lib/types';
import { sortProducts } from '@/lib/sortProducts';
import { filterProducts } from '@/lib/filterProducts';
import ProductGridClient from './ProductGridClient';
import ShopControls from './ShopControls';

const PER_PAGE = 12;
const MAX_PRODUCTS = 200;

export default async function Shop({
  searchParams,
}: {
  searchParams?: Promise<{
    sort?: string;
    page?: string;
    category?: string;
    search?: string;
  }>;
}) {
  const sp = (await searchParams) ?? {};

  const sort = sp.sort ?? 'az';
  const category = sp.category ?? 'all';
  const search = sp.search ?? '';
  const page = Math.max(1, Number(sp.page ?? '1') || 1);

  const client = getWpClient();

  const data = await client.request<AllProductsResponse>(GET_ALL_PRODUCTS, {
    first: MAX_PRODUCTS,
  });

  const filteredProducts = filterProducts({
    products: data.products.nodes,
    category,
    search,
  });

  const allSorted = sortProducts(filteredProducts, sort);

  const totalPages = Math.max(1, Math.ceil(allSorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const products = allSorted.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );

  const categories = Array.from(
    new Map(
      data.products.nodes
        .flatMap((product) => product.productCategories?.nodes ?? [])
        .map((cat) => [cat.slug, cat]),
    ).values(),
  );

  const createHref = (params: {
    sort?: string;
    page?: number;
    category?: string;
    search?: string;
  }) => {
    const urlParams = new URLSearchParams();

    const nextSort = params.sort ?? sort;
    const nextPage = params.page ?? safePage;
    const nextCategory = params.category ?? category;
    const nextSearch = params.search ?? search;

    if (nextPage > 1) urlParams.set('page', String(nextPage));
    if (nextSort !== 'az') urlParams.set('sort', nextSort);
    if (nextCategory !== 'all') urlParams.set('category', nextCategory);
    if (nextSearch) urlParams.set('search', nextSearch);

    const query = urlParams.toString();

    return query ? `/shop?${query}` : '/shop';
  };

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-[1280px] px-6 py-20'>
        <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
          <div>
            <h1 className='mt-6 font-[var(--font-heading)] text-5xl leading-tight text-[#1C1C1C] md:text-6xl'>
              The Collection.
            </h1>

            <p className='mt-5 max-w-[560px] text-base leading-relaxed text-[#2A2A2A] md:text-lg'>
              Handcrafted pieces designed to elevate everyday spaces.
            </p>
          </div>
        </div>

        <div className='mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-start'>
          <aside className='lg:sticky lg:top-24 lg:self-start'>
            <ShopControls
              categories={categories}
              currentCategory={category}
              currentSort={sort}
              currentSearch={search}
            />
          </aside>

          <section className='lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-2 scrollbar-hide'>
            {' '}
            <div className='mb-6 flex items-center justify-between'>
              <p className='text-sm text-[#2A2A2A]/70'>
                Showing {products.length} of {filteredProducts.length} products
              </p>
            </div>
            <ProductGridClient
              key={`${sort}-${category}-${search}-${safePage}`}
              products={products}
            />
            <div className='mt-10 flex items-center justify-center gap-4 pb-2'>
              <Link
                href={createHref({ page: safePage - 1 })}
                aria-disabled={safePage <= 1}
                className={`rounded-full border px-6 py-3 text-xs uppercase tracking-[0.18em] transition ${
                  safePage > 1
                    ? 'border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white'
                    : 'pointer-events-none border-[#1C1C1C]/10 text-[#1C1C1C]/40'
                }`}
              >
                Prev
              </Link>

              <span className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Page {safePage} / {totalPages}
              </span>

              <Link
                href={createHref({ page: safePage + 1 })}
                aria-disabled={safePage >= totalPages}
                className={`rounded-full border px-6 py-3 text-xs uppercase tracking-[0.18em] transition ${
                  safePage < totalPages
                    ? 'border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white'
                    : 'pointer-events-none border-[#1C1C1C]/10 text-[#1C1C1C]/40'
                }`}
              >
                Next
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
