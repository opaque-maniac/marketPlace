import { QueryFunction } from "@tanstack/react-query";
import {
  ErrorResponse,
  SuccessOrdersResponse,
  SuccessProductsResponse,
} from "../types";
import { getSearchRoute } from "../searchDetails";
import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";

export const sendSearch = async ({ search }: { search: string }) => {
  try {
    const url = getSearchRoute();

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: search }),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    const json = (await response.json()) as
      | SuccessProductsResponse
      | SuccessOrdersResponse;

    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
