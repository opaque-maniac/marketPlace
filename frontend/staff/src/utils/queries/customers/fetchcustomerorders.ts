import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessCustomerOrdersResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { getAccessToken } from "../../cookies";
import { apiHost, apiProtocol } from "../../generics";

// Fetch many products
export const fetchCustomerOrders: QueryFunction<
  SuccessCustomerOrdersResponse,
  ["customer-orders", string, number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, id, page, limit, query] = queryKey;
    const url = `${apiProtocol}://${apiHost}/staff/customers/${id}/orders?page=${page}&query=${query}&limit=${limit}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

    return response.json() as Promise<SuccessCustomerOrdersResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
