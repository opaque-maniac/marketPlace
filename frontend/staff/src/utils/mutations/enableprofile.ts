import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "./../errors";
import { apiHost, apiProtocol } from "./../generics";
import { ErrorResponse } from "./../types";

export const enableProfile = async ({
  id,
  type,
}: {
  id: string;
  type: "customer" | "seller" | "staff";
}) => {
  try {
    let url = `${apiProtocol}://${apiHost}/staff`;

    switch (type) {
      case "customer":
        url += `/customers`;
        break;
      case "seller":
        url += `/sellers`;
        break;
      default:
        url += `/staff`;
        break;
    }

    url += `/${id}/enable`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
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
