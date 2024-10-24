import { QueryFunction } from "@tanstack/react-query";
import {
  ErrorResponse,
  SuccesCustomersSearchResponse,
  SuccessCustomersResponse,
} from "../types";
import { responseError, tokenError } from "../errors";
import { getAccessToken } from "../cookies";

export const fetchCustomers: QueryFunction<
  SuccessCustomersResponse,
  ["products", number, number]
> = async ({ queryKey }) => {
  try {
    const [, page, limit] = queryKey;
    const url = `http://localhost:3020/staff/customers?page=${page}&limit=${limit}`;

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

export const searchCustomers: QueryFunction<
  SuccesCustomersSearchResponse,
  ["query", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, query] = queryKey;

    const url = `http://localhost:3020/staff/customers/discover/search?page=${page}&limit=${limit}&query=${query}`;

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

    return response.json() as Promise<SuccesCustomersSearchResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
