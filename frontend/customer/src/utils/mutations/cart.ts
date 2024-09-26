import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";
import { ErrorResponse, SuccessAddToCartResponse } from "../types";

interface AddToCartProps {
  productID: string;
  quantity: number;
}

export const addToCart = async ({ productID, quantity }: AddToCartProps) => {
  try {
    const url = `http://localhost:3020/customers/cart/${productID}?quantity=${quantity}`;
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
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
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