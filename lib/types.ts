export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price?: string | null;
  description?: string | null;
  image?: {
    sourceUrl: string;
    altText?: string | null;
  } | null;
};

export type AllProductsResponse = {
  products: {
    nodes: ProductCardData[];
  };
};
