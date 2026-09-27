import {
  ProductSearchParams,
  ProductSearchResult,
} from "../../definitons/products";
import db from "../../db/db";
import { Product } from "@prisma/client";

// TODO: adapt this to do the search with normalized query
// Also, ensure the other params of product search are used
// Update params to include an option for including images and
// Selecting different fields so we do not just take all of them
// TODO: add a method for finding one product too
// Adapt this so that we can fetch as well as using prisma .findMany or findFirst
export class ProductSearchService {
  async search(param: ProductSearchParams): Promise<ProductSearchResult> {
    const page = param.page || 1;
    const limit = param.limit || 10;
    const normalizedQuery = this.normalizeQuery(param.query);

    const offset = (page - 1) * limit;
    const products = await db.$queryRaw<Product[]>`
        SELECT
            p.*,
            similarity(p.name, ${normalizedQuery}) AS
        score
            FROM "Product" p
            WHERE p.name % ${normalizedQuery}
            ORDER BY score DESC
            LIMIT ${limit + 1}
            OFFSET ${offset}
    `;

    const hasNext = products.length > limit;
    if (hasNext) {
      products.pop();
    }

    return {
      products,
      hasNext,
    };
  }

  private normalizeQuery(query: string): string[] {
    return query
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter(Boolean);
  }
}
