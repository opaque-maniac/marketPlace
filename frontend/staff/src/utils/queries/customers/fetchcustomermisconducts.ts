import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessMisconductsResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { getAccessToken } from "../../cookies";
import { apiHost, apiProtocol } from "../../generics";

// Fetch many products
export const fetchCustomerMisconducts: QueryFunction<
  SuccessMisconductsResponse,
  ["customer-misconducts", string, number, number, string, string]
> = async ({ queryKey }) => {
  try {
    const [, id, page, limit, query, action] = queryKey;
    let url = `${apiProtocol}://${apiHost}/staff/customers/${id}/misconducts?page=${page}&query=${query}&limit=${limit}`;

    if (action) {
      url += `&action=${action}`;
    }

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

    return response.json() as Promise<SuccessMisconductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
