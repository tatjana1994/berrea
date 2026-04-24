export type CartProduct = {
  id: string;
  slug: string;
  name: string;
  price?: string | null;
  image?: { sourceUrl: string; altText?: string | null } | null;
};

export type CartItem = {
  product: CartProduct;
  qty: number;
};
