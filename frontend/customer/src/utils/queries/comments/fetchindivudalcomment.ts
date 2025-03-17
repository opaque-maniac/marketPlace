import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessIndividualCommentResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

export const fetchIndividualComment: QueryFunction<
  SuccessIndividualCommentResponse,
  ["comment", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/comments/${id}`;

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

    return response.json() as Promise<SuccessIndividualCommentResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
