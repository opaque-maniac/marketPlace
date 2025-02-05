import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessEmailResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { getAccessToken } from "../../cookies";

export const fetchMaskedEmail: QueryFunction<
  SuccessEmailResponse,
  ["email"]
> = async ({ queryKey }) => {
  try {
    const url = `${apiProtocol}://${apiHost}/security/fetch-email`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError;
    }

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

    return response.json() as Promise<SuccessEmailResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw responseError;
  }
};
