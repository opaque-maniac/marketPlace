import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse, SuccessRemoveFromCartResponse } from "../../types";

export const orderCartItem = async ({ id }: { id: string }) => {
  try {
    const url = `${apiProtocol}://${apiHost}/customers/cart/${id}`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      let data: ErrorResponse | undefined;
      try {
        data = (await response.json()) as ErrorResponse;
      } catch (e) {
        throw responseError();
      }
      throw new Error(JSON.stringify(data));
    }

    const data = (await response.json()) as SuccessRemoveFromCartResponse;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
