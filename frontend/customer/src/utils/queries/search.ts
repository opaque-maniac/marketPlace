import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessSearchResponse } from "../types";

export const searchProducts: QueryFunction<
  SuccessSearchResponse,
  ["search", string | null, string | null, number, number]
> = async ({ queryKey }) => {
  try {
    const [, query, category, page, limit] = queryKey;
    let url = `http://localhost:3020/customers/products?page=${page}&limit=${limit}`;

    if (query && query.trim() !== "") {
      url += `&query=${query}`;
    }

    if (category && category.trim() !== "") {
      url += `&category=${category}`;
    }
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    return response.json() as Promise<SuccessSearchResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
