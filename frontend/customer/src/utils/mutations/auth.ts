import { ErrorResponse } from "react-router-dom";
import { SuccessLoginRespose, SuccessRegisterResponse } from "../types";
import { responseError } from "../errors";

interface LoginData {
  email: string;
  password: string;
}

// Mutation for login
export const sendLogin = async (data: LoginData) => {
  try {
    const url = "http://localhost:3020/customers/login";
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

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// Mutation for register
export const sendRegister = async (data: RegisterData) => {
  try {
    const url = "http://localhost:3020/customers/register";
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
