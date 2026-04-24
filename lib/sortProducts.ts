import type { ProductCardData } from '@/lib/types';

export type ProductSort = 'az' | 'za' | 'price-low' | 'price-high';

function getNumericPrice(product: ProductCardData) {
  const raw = product.salePrice || product.price || product.regularPrice || '0';

  const clean = raw
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/\s/g, '')
    .replace(/[^\d.,]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const num = Number(clean);

  return Number.isNaN(num) ? 0 : num;
}
export function sortProducts(
  products: ProductCardData[],
  sort: string,
): ProductCardData[] {
  const copy = [...products];

  switch (sort) {
    case 'za':
      return copy.sort((a, b) => b.name.localeCompare(a.name));

    case 'price-low':
      return copy.sort((a, b) => getNumericPrice(a) - getNumericPrice(b));

    case 'price-high':
      return copy.sort((a, b) => getNumericPrice(b) - getNumericPrice(a));

    case 'az':
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
}
