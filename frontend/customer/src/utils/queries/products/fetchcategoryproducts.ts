import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessProductsResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchCategoryProducts: QueryFunction<
  SuccessProductsResponse,
  ["products", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, category] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/products?page=${page}&limit=${limit}&category=${category}`;
    const options = {
      method: "GET",
      headers: {
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

    return response.json() as Promise<SuccessProductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
