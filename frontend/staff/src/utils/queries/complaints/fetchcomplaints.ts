import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessComplaintsResponse } from "../../types";
import { responseError, tokenError } from "../../errors";
import { getAccessToken } from "../../cookies";
import { apiHost, apiProtocol } from "../../generics";

export const fetchComplaints: QueryFunction<
  SuccessComplaintsResponse,
  ["complaints", number, number, string, string]
> = async ({ queryKey }) => {
  try {
    const [, page, limit, query, resolved] = queryKey;

    let url = `${apiProtocol}://${apiHost}/staff/complaints?page=${page}&query=${query}&limit=${limit}`;

    if (resolved) {
      url += `&resolved=${resolved}`;
    }

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

    return response.json() as Promise<SuccessComplaintsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
