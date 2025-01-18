import { ErrorResponse } from "../../types";
import { SuccessLoginRespose } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

interface LoginData {
  email: string;
  password: string;
}

// Mutation for login
export const sendLogin = async (data: LoginData) => {
  try {
    const url = `${apiProtocol}://${apiHost}/seller/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

    const obj = (await response.json()) as SuccessLoginRespose;
    return obj;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
