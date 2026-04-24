'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ShopControlsProps = {
  categories: Category[];
  currentCategory: string;
  currentSort: string;
  currentSearch: string;
};

const sortOptions = [
  { label: 'A–Z', value: 'az' },
  { label: 'Z–A', value: 'za' },
  { label: 'Price low to high', value: 'price-low' },
  { label: 'Price high to low', value: 'price-high' },
];

export default function ShopControls({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
}: ShopControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const selectedSort =
    sortOptions.find((option) => option.value === currentSort) ??
    sortOptions[0];

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('page');

    if (!value || value === 'all' || value === 'az') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(params.toString() ? `/shop?${params.toString()}` : '/shop');
  };

  return (
    <aside className='rounded-[32px] border border-[#1C1C1C]/10 bg-[#F9F6F2] p-6 lg:sticky lg:top-28'>
      <div className='flex items-center justify-between'>
        <p className='text-xs uppercase tracking-[0.24em] text-[#2A2A2A]/60'>
          Filters
        </p>

        {(currentCategory !== 'all' ||
          currentSearch ||
          currentSort !== 'az') && (
          <button
            type='button'
            onClick={() => router.push('/shop')}
            className='text-xs uppercase tracking-[0.18em] text-[#1C1C1C] underline underline-offset-4'
          >
            Clear
          </button>
        )}
      </div>

      <form action='/shop' className='mt-6'>
        <input type='hidden' name='category' value={currentCategory} />
        <input type='hidden' name='sort' value={currentSort} />

        <input
          name='search'
          defaultValue={currentSearch}
          placeholder='Search...'
          className='h-12 w-full rounded-full border border-[#1C1C1C]/10 bg-white px-5 text-sm outline-none placeholder:text-[#2A2A2A]/40 focus:border-[#1C1C1C]/30'
        />
      </form>

      <div className='mt-8 border-t border-[#1C1C1C]/10 pt-6'>
        <p className='text-xs uppercase tracking-[0.22em] text-[#2A2A2A]/60'>
          Category
        </p>

        <div className='mt-4 space-y-3'>
          <label className='flex cursor-pointer items-center gap-3 text-sm text-[#1C1C1C]'>
            <input
              type='radio'
              name='category'
              checked={currentCategory === 'all'}
              onChange={() => updateParams('category', 'all')}
              className='h-4 w-4 accent-[#1C1C1C]'
            />
            All products
          </label>

          {categories.map((cat) => (
            <label
              key={cat.id}
              className='flex cursor-pointer items-center gap-3 text-sm text-[#1C1C1C]'
            >
              <input
                type='radio'
                name='category'
                checked={currentCategory === cat.slug}
                onChange={() => updateParams('category', cat.slug)}
                className='h-4 w-4 accent-[#1C1C1C]'
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div className='mt-8 border-t border-[#1C1C1C]/10 pt-6'>
        <p className='text-xs uppercase tracking-[0.22em] text-[#2A2A2A]/60'>
          Sort by
        </p>

        <div className='relative mt-4'>
          <button
            type='button'
            onClick={() => setSortOpen((prev) => !prev)}
            className='flex h-12 w-full items-center justify-between rounded-full border border-[#1C1C1C]/10 bg-white px-5 text-sm text-[#1C1C1C]'
          >
            {selectedSort.label}
            <ChevronDown
              size={16}
              className={`transition ${sortOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {sortOpen && (
            <div className='absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#1C1C1C]/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]'>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type='button'
                  onClick={() => {
                    updateParams('sort', option.value);
                    setSortOpen(false);
                  }}
                  className={`block w-full px-5 py-3 text-left text-sm transition hover:bg-[#F9F6F2] ${
                    currentSort === option.value
                      ? 'bg-[#1C1C1C] text-white hover:bg-[#1C1C1C]'
                      : 'text-[#1C1C1C]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
