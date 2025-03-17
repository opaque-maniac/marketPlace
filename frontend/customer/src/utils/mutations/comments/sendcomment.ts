import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse, SuccessCommentCreateResponse } from "../../types";

export const sendComment = async ({
  message,
  productID,
  edit = false,
  reply = false,
  id,
}: {
  message: string;
  productID?: string;
  edit?: boolean;
  reply?: boolean;
  id?: string;
}) => {
  try {
    let url = `${apiProtocol}://${apiHost}/customers`;
    if (edit || reply) {
      url += `/comments/${id}`;
    } else if (productID) {
      url += `/products/${productID}/comments`;
    } else {
      throw responseError();
    }

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: edit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
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

    const data = (await response.json()) as SuccessCommentCreateResponse;
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
