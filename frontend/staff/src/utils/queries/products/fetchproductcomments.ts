import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessProductCommentsResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { getAccessToken } from "../../cookies";
import { apiHost, apiProtocol } from "../../generics";

export const fetchProductComments: QueryFunction<
  SuccessProductCommentsResponse,
  ["comments", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, id] = queryKey;

    const url = `${apiProtocol}://${apiHost}/staff/products/${id}/comments?page=${page}&limit=${limit}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

    return response.json() as Promise<SuccessProductCommentsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
