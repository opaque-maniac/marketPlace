import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";
import { ErrorResponse, SuccessAddToWishlistResponse } from "../types";

interface AddToWishlistProps {
  productID: string;
}

export const addToWishlist = async ({ productID }: AddToWishlistProps) => {
  try {
    const url = `http://localhost:3020/customers/wishlist/${productID}`;
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

    const data = (await response.json()) as SuccessAddToWishlistResponse;
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
