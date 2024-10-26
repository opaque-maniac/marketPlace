import { QueryFunction } from "@tanstack/react-query";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";
import { ErrorResponse, SuccessStaffResponse } from "../types";

export const fetchStaff: QueryFunction<
  SuccessStaffResponse,
  ["staff", number, number]
> = async ({ queryKey }) => {
  try {
    const url = `http://localhost:3020/staff/staff`;

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
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
