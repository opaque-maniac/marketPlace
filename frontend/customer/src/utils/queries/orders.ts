import { QueryFunction } from "@tanstack/react-query";
import { SuccessOrderResponse, SuccessOrdersResponse } from "../types";
import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";
import { ErrorResponse } from "react-router-dom";

export const fetchOrders: QueryFunction<
  SuccessOrdersResponse,
  ["orders", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, ready] = queryKey;
    const url = `http://localhost:3020/seller/orders?page=${page}&limit=${limit}&ready=${ready}`;
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
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    return response.json() as Promise<SuccessOrdersResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const fetchOrder: QueryFunction<
  SuccessOrderResponse,
  ["order", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;

    const url = `http://localhost:3020/seller/orders/${id}`;
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
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    return response.json() as Promise<SuccessOrderResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
