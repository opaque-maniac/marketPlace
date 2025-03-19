import { ErrorResponse } from "react-router-dom";
import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";

interface Props {
  url: string;
  authenticate?: boolean;
}

export async function baseQueryFunction<T>({
  url,
  authenticate = false,
}: Props) {
  let token: string | undefined = undefined;

  if (authenticate) {
    token = getAccessToken();

    if (!token) {
      throw tokenError;
    }
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authenticate ? `Bearer ${token}` : "",
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    let error: ErrorResponse;

    try {
      error = (await response.json()) as ErrorResponse;
    } catch (e) {
      throw responseError;
    }

    throw new Error(JSON.stringify(error));
  }

  return response.json() as Promise<T>;
}
