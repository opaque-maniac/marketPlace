import { QueryFunction } from "@tanstack/react-query";
import { ErrorResponse, SuccessMisconductsResponse } from "../types";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";
import { apiHost, apiProtocol } from "../generics";

type userType = "customer" | "staff" | "seller";
type actionType = "DISABLE_PROFILE" | "DELETE_PROFILE";

export const fetchProfileMisconducts: QueryFunction<
  SuccessMisconductsResponse,
  ["profile-misconducts", string, number, number, actionType, userType]
> = async ({ queryKey }) => {
  try {
    const [, id, page, limit, action, role] = queryKey;
    let url = `${apiProtocol}://${apiHost}/staff`;
    const queryStr = `?page=${page}&limit=${limit}&action=${action}&mine=true`;

    switch (role) {
      case "customer":
        url += `/customers`;
        break;
      case "staff":
        url += `/staff`;
        break;
      default:
        url += `/seller`;
        break;
    }

    url += `/${id}/misconducts${queryStr}`;

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

    return response.json() as Promise<SuccessMisconductsResponse>;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
