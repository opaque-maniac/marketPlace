import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse } from "../../types";

export const sendChangeEmailToken = async (token: string) => {
  try {
    const url = `${apiProtocol}://${apiHost}/security/change-email/token`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
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

    const data = (await response.json()) as { message: string; token: string };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw responseError;
  }
};
