import { QueryFunction } from "@tanstack/react-query";
import {
  SuccessIndividualOrderResponse,
  SuccessOrderItemResponse,
  SuccessOrdersResponse,
} from "../types";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";
import { ErrorResponse } from "react-router-dom";

export const fetchOrders: QueryFunction<
  SuccessOrdersResponse,
  ["orders", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, status] = queryKey;
    const url = `http://localhost:3020/customers/orders?page=${page}&limit=${limit}&status=${status}`;
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

export const fetchIndividualOrder: QueryFunction<
  SuccessIndividualOrderResponse,
  ["order", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `http://localhost:3020/customers/orders/${id}`;

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

    return response.json() as Promise<SuccessIndividualOrderResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const fetchOrderItems: QueryFunction<
  SuccessOrderItemResponse,
  ["orderItems", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, id] = queryKey;

    const url = `http://localhost:3020/customers/orders/${id}/items?page=${page}&limit=${limit}`;

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
