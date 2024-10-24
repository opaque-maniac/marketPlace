import { QueryFunction } from "@tanstack/react-query";
import {
  ErrorResponse,
  SuccessProductCommentsResponse,
  SuccessProductResponse,
  SuccessProductsResonse,
  SuccessProductsSearchResponse,
} from "../types";
import { responseError, tokenError } from "../errors";
import { getAccessToken } from "../cookies";

// Fetch many products
export const fetchProducts: QueryFunction<
  SuccessProductsResonse,
  ["products", number, number]
> = async ({ queryKey }) => {
  try {
    const [, page, limit] = queryKey;
    const url = `http://localhost:3020/staff/products?page=${page}&limit=${limit}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(JSON.stringify(error));
      } catch (e) {
        if (e instanceof Error) {
          throw responseError();
        }
      }
    }

    return response.json() as Promise<SuccessProductsResonse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const searchProducts: QueryFunction<
  SuccessProductsSearchResponse,
  ["query", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, query] = queryKey;

    const url = `http://localhost:3020/staff/products/search?limit=${limit}&page=${page}&query=${query}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "applicaton/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(JSON.stringify(error));
      } catch (e) {
        if (e instanceof Error) {
          throw responseError();
        }
      }
    }

    return response.json() as Promise<SuccessProductsSearchResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const fetchIndividualProduct: QueryFunction<
  SuccessProductResponse,
  ["product", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;

    const url = `http://localhost:3020/staff/products/${id}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(JSON.stringify(error));
      } catch (e) {
        if (e instanceof Error) {
          throw responseError();
        }
      }
    }

    return response.json() as Promise<SuccessProductResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const fetchProductComments: QueryFunction<
  SuccessProductCommentsResponse,
  ["comments", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, id] = queryKey;

    const url = `http://localhost:3020/staff/products/${id}/comments?page=${page}&limit=${limit}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(JSON.stringify(error));
      } catch (e) {
        if (e instanceof Error) {
          throw responseError();
        }
      }
    }

    return response.json() as Promise<SuccessProductCommentsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
