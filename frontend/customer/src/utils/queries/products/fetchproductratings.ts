import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessProductRatings } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

// Fetch a single product
export const fetchProductRatings: QueryFunction<
  SuccessProductRatings,
  ["product", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/products/${id}/ratings`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    console.log(response);

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

    return response.json() as Promise<SuccessProductRatings>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
