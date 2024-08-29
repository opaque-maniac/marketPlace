import { QueryFunction } from "@tanstack/react-query";
import {
  ErrorResponse,
  SuccessCommentsResponse,
  SuccessProductResponse,
  SuccessProductsResponse,
} from "../types";

// Fetch many products
export const fetchProducts: QueryFunction<
  SuccessProductsResponse,
  ["products", number, number]
> = async ({ queryKey }) => {
  try {
    const [, page, limit] = queryKey;
    const url = `http://localhost:3020/customers/products?page=${page}&limit=${limit}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const obj = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(obj));
    }

    return response.json() as Promise<SuccessProductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

// Fetch a single product
export const fetchProduct: QueryFunction<
  SuccessProductResponse,
  ["product", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `http://localhost:3020/customers/products/${id}`;
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

    return response.json() as Promise<SuccessProductResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const fetchRelatedProducts: QueryFunction<
  SuccessProductsResponse,
  ["related", string, number, number]
> = async ({ queryKey }) => {
  try {
    const [, category, page, limit] = queryKey;
    const url = `http://localhost:3020/customers/products?category=${category}&page=${page}&limit=${limit}`;
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

    return response.json() as Promise<SuccessProductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const fetchProductComments: QueryFunction<
  SuccessCommentsResponse,
  ["comments", string, number]
> = async ({ queryKey }) => {
  try {
    const [, id, page] = queryKey;
    const url = `http://localhost:3020/customers/products/${id}/comments?page=${page}`;
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

    return response.json() as Promise<SuccessCommentsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
