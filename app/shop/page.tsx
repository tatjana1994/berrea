/* eslint-disable @typescript-eslint/no-explicit-any */
import Shop from '@/components/Shop';

export default function ShopPage({
  searchParams,
}: {
  searchParams?: { page?: string; sort?: string };
}) {
  return (
    <div className='mt-20'>
      <Shop searchParams={searchParams as any} />
    </div>
  );
}
