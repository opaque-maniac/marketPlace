import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";
import { ErrorResponse, SuccessCancelOrderResponse } from "../types";

export const cancelOrder = async ({ id }: { id: string }) => {
  try {
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

    const data = (await response.json()) as SuccessCancelOrderResponse;
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
