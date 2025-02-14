import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse, SuccessAddToCartResponse } from "../../types";

interface AddToCartProps {
  productID: string;
  quantity: number;
}

export const addToCart = async ({ productID, quantity }: AddToCartProps) => {
  try {
    const url = `${apiProtocol}://${apiHost}/customers/cart/${productID}?quantity=${quantity}`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
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

    const data = (await response.json()) as SuccessAddToCartResponse;
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
