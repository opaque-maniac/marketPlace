import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessSellerResponse } from "../types";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";

export const fetchProfile: QueryFunction<
  SuccessSellerResponse,
  ["profile", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `http://localhost:3020/seller/profile/${id}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "GET",
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

    return response.json() as Promise<SuccessSellerResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
