import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse } from "../../types";

export const emptyCart = async () => {
  try {
    const url = `${apiProtocol}://${apiHost}/customers/cart`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
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

    const data = (await response.json()) as { message: string };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
