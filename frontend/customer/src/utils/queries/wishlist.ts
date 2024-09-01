import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessWishlistQueryResponse } from "../types";
import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";

export const fetchWishlist: QueryFunction<
  SuccessWishlistQueryResponse,
  ["wishlist", number, number]
> = async ({ queryKey }) => {
  try {
    const [, page, limit] = queryKey;

    const url = `http://localhost:3020/customers/wishlist?page=${page}&limit=${limit}`;
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
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    return response.json() as Promise<SuccessWishlistQueryResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
