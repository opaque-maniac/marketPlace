import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessRepliesResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchReplies: QueryFunction<
  SuccessRepliesResponse,
  ["replies", string, number, number]
> = async ({ queryKey }) => {
  try {
    const [, id, page, limit] = queryKey;

    const url = `${apiProtocol}://${apiHost}/customers/comments/${id}?page=${page}&limit=${limit}`;

    const options = {
      method: "GET",
      headers: {
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

    return response.json() as Promise<SuccessRepliesResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
