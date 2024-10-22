import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessCartResponse } from "../types";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";

export const fetchCart: QueryFunction<
  SuccessCartResponse,
  ["cart", number, number]
> = async ({ queryKey }) => {
  try {
    const [, page, limit] = queryKey;
    const url = `http://localhost:3020/customers/cart?page=${page}&limit=${limit}`;
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

    return response.json() as Promise<SuccessCartResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
