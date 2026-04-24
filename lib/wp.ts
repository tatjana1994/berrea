// lib/wp.ts
import { GraphQLClient } from 'graphql-request';
import { GET_FEATURED_PRODUCTS } from './queries';
import { ProductCardData } from './types';

type ProductNode = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  image?: { sourceUrl: string; altText?: string | null } | null;
  price?: string | null;
  regularPrice?: string | null;
  salePrice?: string | null;
};

type GetFeaturedProductsResponse = {
  products: { nodes: ProductNode[] };
};

function getClient() {
  const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL;
  if (!endpoint) throw new Error('Missing NEXT_PUBLIC_WP_GRAPHQL_URL');
  return new GraphQLClient(endpoint);
}

export async function fetchFeaturedProducts(
  first = 3,
): Promise<ProductCardData[]> {
  const client = getClient();

  const data = await client.request<GetFeaturedProductsResponse>(
    GET_FEATURED_PRODUCTS,
    { first },
  );

  // map u format koji koristi ProductCard
  return data.products.nodes.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description ?? null,
    price: p.salePrice ?? p.price ?? p.regularPrice ?? null,
    image: p.image
      ? { sourceUrl: p.image.sourceUrl, altText: p.image.altText ?? null }
      : null,
  }));
}

export function getWpClient() {
  const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL as string;
  if (!endpoint) throw new Error('Missing NEXT_PUBLIC_WP_GRAPHQL_URL');
  return new GraphQLClient(endpoint);
}
