import type { ProductCardData } from '@/lib/types';

type FilterProductsParams = {
  products: ProductCardData[];
  category?: string;
  search?: string;
};

export function filterProducts({
  products,
  category,
  search,
}: FilterProductsParams) {
  return products.filter((product) => {
    const matchesCategory =
      !category ||
      category === 'all' ||
      product.productCategories?.nodes?.some((cat) => cat.slug === category);

    const matchesSearch =
      !search || product.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}
