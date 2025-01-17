import { QueryFunction } from "@tanstack/react-query";
import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { ErrorResponse, SuccessStaffResponse } from "../../types";
import { apiHost, apiProtocol } from "../../generics";

export const fetchStaff: QueryFunction<
  SuccessStaffResponse,
  ["staff", number, number, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, query] = queryKey;
    const url = `${apiProtocol}://${apiHost}/staff/staff?page=${page}&limit=${limit}&query=${query}`;

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

    return response.json() as Promise<SuccessStaffResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
