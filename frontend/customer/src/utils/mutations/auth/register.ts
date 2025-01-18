import { ErrorResponse } from "react-router-dom";
import { SuccessRegisterResponse } from "../../types";
import { responseError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// Mutation for register
export const sendRegister = async (data: RegisterData) => {
  try {
    const url = `${apiProtocol}://${apiHost}/customers/auth/register`;
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

    const obj = (await response.json()) as SuccessRegisterResponse;
    return obj;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
