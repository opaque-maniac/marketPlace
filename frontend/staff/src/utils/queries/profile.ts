import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessStaffProfileResponse } from "../types";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";
import { apiHost, apiProtocol } from "../generics";

export const fetchProfile: QueryFunction<
  SuccessStaffProfileResponse,
  ["profile"]
> = async ({ queryKey }) => {
  try {
    const url = `${apiProtocol}://${apiHost}/staff/profile`;

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

    return response.json() as Promise<SuccessStaffProfileResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
