import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessCustomersResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { getAccessToken } from "../../cookies";
import { apiHost, apiProtocol } from "../../generics";

export const fetchCustomers: QueryFunction<
  SuccessCustomersResponse,
  ["customers", number, number, string, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, query, active] = queryKey;
    let url = `${apiProtocol}://${apiHost}/staff/customers?page=${page}&limit=${limit}&query=${query}`;

    if (active) {
      url += `&active=${active}`;
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

    return response.json() as Promise<SuccessCustomersResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
