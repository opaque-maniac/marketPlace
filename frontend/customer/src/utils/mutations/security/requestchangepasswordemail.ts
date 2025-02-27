import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse } from "../../types";

export const requestChangePasswordEmail = async () => {
  try {
    const url = `${apiProtocol}://${apiHost}/security/change-password`;

    const bearer = getAccessToken();

    if (!bearer) {
      throw tokenError;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
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

    const data = (await response.json()) as { message: string; email: string };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw responseError;
  }
};
