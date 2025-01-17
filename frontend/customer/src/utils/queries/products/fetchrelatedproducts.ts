import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessProductsResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchRelatedProducts: QueryFunction<
  SuccessProductsResponse,
  ["related", string, number, number]
> = async ({ queryKey }) => {
  try {
    const [, category, page, limit] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/products?category=${category}&page=${page}&limit=${limit}`;
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
