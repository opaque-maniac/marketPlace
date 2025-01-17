import { ErrorResponse } from "react-router-dom";
import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { SuccessOrderResponse } from "../../types";
import { apiHost, apiProtocol } from "../../generics";

export const updateOrder = async ({ id }: { id: string }) => {
  try {
    const url = `${apiProtocol}://${apiHost}/seller/orders/${id}`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "PUT",
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

    const json = (await response.json()) as SuccessOrderResponse;
    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
