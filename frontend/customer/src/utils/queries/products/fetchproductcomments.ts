import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessCommentsResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchProductComments: QueryFunction<
  SuccessCommentsResponse,
  ["comments", string, number]
> = async ({ queryKey }) => {
  try {
    const [, id, page] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/products/${id}/comments?page=${page}`;
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

    return response.json() as Promise<SuccessCommentsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
