import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWpClient } from '@/lib/wp';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_SLUG } from '@/lib/queries';
import { formatPrice } from '@/lib/formatPrice';
import type { AllProductsResponse } from '@/lib/types';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ProductBySlugResponse = {
  product: {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
    price?: string | null;
    regularPrice?: string | null;
    salePrice?: string | null;
    image?: { sourceUrl: string; altText?: string | null } | null;
  } | null;
};

const MAX_PRODUCTS = 200;

export async function generateStaticParams() {
  const client = getWpClient();
  const data = await client.request<AllProductsResponse>(GET_ALL_PRODUCTS, {
    first: MAX_PRODUCTS,
  });

  return (data.products.nodes ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const client = getWpClient();
  const data = await client.request<ProductBySlugResponse>(
    GET_PRODUCT_BY_SLUG,
    {
      slug,
    },
  );

  if (!data.product) return { title: 'Product not found' };

  return {
    title: `${data.product.name} | Shop`,
    description:
      (data.product.description ?? '')
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 160) || 'Product details',
  };
}

function stripHtml(html?: string | null) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const client = getWpClient();
  const data = await client.request<ProductBySlugResponse>(
    GET_PRODUCT_BY_SLUG,
    {
      slug,
    },
  );

  const product = data.product;
  if (!product) return notFound();

  const descText = stripHtml(product.description);
  const displayPrice =
    formatPrice(product.price) ??
    formatPrice(product.salePrice) ??
    formatPrice(product.regularPrice) ??
    '—';

  return (
    <main className='bg-white mt-20'>
      <div className='max-w-[1280px] mx-auto px-6 py-20'>
        <Link
          href='/shop'
          className='inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#2A2A2A]/70 hover:text-[#1C1C1C] transition'
        >
          ← Back to shop
        </Link>

        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
          <div className='relative w-full overflow-hidden rounded-3xl bg-[#F6F2EC]'>
            <div className='relative aspect-[4/5] w-full'>
              {product.image?.sourceUrl ? (
                <Image
                  src={product.image.sourceUrl}
                  alt={product.image.altText ?? product.name}
                  fill
                  className='object-cover'
                  priority
                />
              ) : (
                <div className='absolute inset-0 flex items-center justify-center text-sm text-[#2A2A2A]/60'>
                  No image
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col'>
            <p className='text-xs uppercase tracking-[0.25em] text-[#2A2A2A]/70'>
              Product
            </p>

            <h1 className='mt-5 font-[var(--font-heading)] text-4xl md:text-5xl leading-tight text-[#1C1C1C]'>
              {product.name}
            </h1>

            <p className='mt-6 text-lg text-[#1C1C1C]'>{displayPrice}</p>

            {descText ? (
              <div className='mt-8 text-base leading-relaxed text-[#2A2A2A]/90 whitespace-pre-line'>
                {descText}
              </div>
            ) : (
              <p className='mt-8 text-base leading-relaxed text-[#2A2A2A]/80'>
                Crafted for Beautiful Bathrooms.
              </p>
            )}

            <div className='mt-10 flex flex-col sm:flex-row gap-3'>
              <button
                type='button'
                className='inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#1C1C1C] px-8 py-4 text-xs uppercase tracking-[0.18em] text-white transition hover:opacity-90'
              >
                Add to cart
              </button>

              <Link
                href='/shop'
                className='inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-[#1C1C1C]/20 px-8 py-4 text-xs uppercase tracking-[0.18em] text-[#1C1C1C] transition hover:bg-[#F9F6F2]'
              >
                Continue shopping
              </Link>
            </div>

            <div className='mt-12 rounded-2xl border border-[#1C1C1C]/10 p-6'>
              <p className='text-xs uppercase tracking-[0.2em] text-[#2A2A2A]/70'>
                Details
              </p>
              <ul className='mt-4 space-y-2 text-sm text-[#2A2A2A]/90'>
                <li>• Handcrafted finish</li>
                <li>• Premium materials</li>
                <li>• Designed for everyday spaces</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
