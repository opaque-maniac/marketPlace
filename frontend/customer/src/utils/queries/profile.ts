import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessCustomerResponse } from "../types";
import { getAccessToken, getUserID } from "../cookies";
import { responseError, tokenError } from "../errors";
import { apiHost, apiProtocol } from "../generics";

export const fetchProfile: QueryFunction<
  SuccessCustomerResponse,
  ["profile"]
> = async ({ queryKey }) => {
  try {
    const id = getUserID();

    if (!id) {
      throw tokenError;
    }

    const url = `${apiProtocol}://${apiHost}/customers/profile`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
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

    return response.json() as Promise<SuccessCustomerResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
