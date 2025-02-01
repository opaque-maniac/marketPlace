import { QueryFunction } from "@tanstack/react-query";
import { SuccessOrdersResponse } from "../../types";
import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { ErrorResponse } from "react-router-dom";
import { apiHost, apiProtocol } from "../../generics";

export const fetchOrders: QueryFunction<
  SuccessOrdersResponse,
  ["orders", number, number, string, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, status, query] = queryKey;
    const url = `${apiProtocol}://${apiHost}/seller/orders?page=${page}&limit=${limit}&status=${status}&query=${query}`;
    const token = getAccessToken();

    if (!token) {
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

    return response.json() as Promise<SuccessOrdersResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
