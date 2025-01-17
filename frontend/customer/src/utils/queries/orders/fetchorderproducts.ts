import { QueryFunction } from "@tanstack/react-query";
import { SuccessOrderItemResponse } from "../../types";
import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { ErrorResponse } from "react-router-dom";
import { apiHost, apiProtocol } from "../../generics";

export const fetchOrderItems: QueryFunction<
  SuccessOrderItemResponse,
  ["orderItems", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, id] = queryKey;

    const url = `${apiProtocol}://${apiHost}/customers/orders/${id}/items?page=${page}&limit=${limit}`;

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

    return response.json() as Promise<SuccessOrderItemResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
