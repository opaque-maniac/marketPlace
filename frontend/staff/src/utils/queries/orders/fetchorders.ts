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
    const [, page, limit, query, status] = queryKey;
    let url = `${apiProtocol}://${apiHost}/staff/orders?page=${page}&limit=${limit}&query=${query}`;

    if (status) {
      url += `&status=${status}`;
    }

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
