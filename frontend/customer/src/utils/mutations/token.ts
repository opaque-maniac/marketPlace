import { getRefreshToken } from "../cookies";
import { refreshTokenError, responseError } from "../errors";
import { ErrorResponse } from "../types";

export const sendRefreshToken = async () => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw refreshTokenError();
    }

    const url = "http://localhost:3020/api/tokenrefresh";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
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

    const json = (await response.json()) as { token: string };

    return json.token;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
