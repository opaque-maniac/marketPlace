import { Product } from "@prisma/client";

export interface ProductSearchParams {
  query: string;
  categoryId?: string;
  verified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sellerID?: string;
  sellerVerified?: boolean;
}

/*
export interface ProductSearchResult {
  product: Product;
  score: number;
}
  */

export interface ProductSearchResult {
  products: Product[];
  hasNext: boolean;
}
