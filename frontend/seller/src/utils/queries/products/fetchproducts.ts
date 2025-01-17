import { QueryFunction } from "@tanstack/react-query";
import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { ErrorResponse, SuccessProductsResponse } from "../../types";
import { apiHost, apiProtocol } from "../../generics";

export const fetchProducts: QueryFunction<
  SuccessProductsResponse,
  ["products", number, number]
> = async ({ queryKey }) => {
  try {
    const [, page, limit] = queryKey;
    const url = `${apiProtocol}://${apiHost}/seller/products?page=${page}&limit=${limit}`;
    const token = getAccessToken();

    if (!token) {
      console.log("Token not found");
      throw tokenError();
    }

    const options = {
      method: "GET",
      headers: {
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

    return response.json() as Promise<SuccessProductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
