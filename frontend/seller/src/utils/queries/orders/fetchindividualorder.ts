import { QueryFunction } from "@tanstack/react-query";
import { SuccessOrderResponse } from "../../types";
import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { ErrorResponse } from "react-router-dom";
import { apiHost, apiProtocol } from "../../generics";

export const fetchOrder: QueryFunction<
  SuccessOrderResponse,
  ["order", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;

    const url = `${apiProtocol}://${apiHost}/seller/orders/${id}`;
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

    return response.json() as Promise<SuccessOrderResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
