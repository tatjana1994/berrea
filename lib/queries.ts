// lib/queries.ts
import { gql } from 'graphql-request';

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        slug
        name
        description

        ... on ProductWithPricing {
          price
          regularPrice
          salePrice
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_CURSOR = gql`
  query GetProductsCursor($first: Int!) {
    products(first: $first) {
      pageInfo {
        endCursor
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        slug
        name
        description

        image {
          sourceUrl
          altText
        }

        productCategories {
          nodes {
            id
            name
            slug
          }
        }

        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }

        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }

        ... on ExternalProduct {
          price
          regularPrice
          salePrice
        }

        ... on GroupProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;
export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      slug
      name
      description
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
      image {
        sourceUrl
        altText
      }
    }
  }
`;
