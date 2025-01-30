import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessProductsResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchSellerProducts: QueryFunction<
  SuccessProductsResponse,
  ["products", string, number, number]
> = async ({ queryKey }) => {
  try {
    const [, id, page, limit] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/sellers/${id}/products?page=${page}&limit=${limit}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const data = (await response.json()) as ErrorResponse;
        throw new Error(data.message);
      } catch (e) {
        throw responseError();
      }
    }

    return response.json() as Promise<SuccessProductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw responseError();
  }
};
