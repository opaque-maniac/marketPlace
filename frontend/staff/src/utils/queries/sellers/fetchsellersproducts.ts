import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessSellersProductsResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { getAccessToken } from "../../cookies";
import { apiHost, apiProtocol } from "../../generics";

// Fetch many products
export const fetchSellersProducts: QueryFunction<
  SuccessSellersProductsResponse,
  ["sellers-products", string, number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, id, page, limit, query] = queryKey;
    let url = `${apiProtocol}://${apiHost}/staff/sellers/${id}/products?page=${page}&limit=${limit}`;

    if (query) {
      url += `&query=${query}`;
    }

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

    return response.json() as Promise<SuccessSellersProductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
