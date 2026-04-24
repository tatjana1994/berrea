export type ProductCardData = {
  id: string;
  slug: string;
  name: string;

  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;

  description?: string | null;

  image?: {
    sourceUrl: string;
    altText?: string | null;
  } | null;

  productCategories?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
};

export type AllProductsResponse = {
  products: {
    nodes: ProductCardData[];
  };
  productCategories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
};
