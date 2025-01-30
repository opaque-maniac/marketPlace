import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessFetchSellerResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchSeller: QueryFunction<
  SuccessFetchSellerResponse,
  ["seller", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/sellers/${id}`;

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
        throw new Error(JSON.stringify(data));
      } catch (e) {
        throw responseError();
      }
    }

    return response.json() as Promise<SuccessFetchSellerResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw responseError;
  }
};
