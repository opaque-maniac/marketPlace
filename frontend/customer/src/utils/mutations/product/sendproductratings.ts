import { ErrorResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { getAccessToken } from "../../cookies";

export const sendProductRating = async ({
  value,
  id,
}: {
  value: number;
  id: string;
}) => {
  try {
    const url = `${apiProtocol}://${apiHost}/customers/products/${id}/ratings`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ value }),
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

    const data = (await response.json()) as {
      message: string;
    };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
