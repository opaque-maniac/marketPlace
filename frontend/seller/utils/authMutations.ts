import {
  ErrorResonse,
  LoginPropType,
  LoginResponseType,
  RegisterPropType,
  RegisterResponseType,
} from "./types";

export const sendLogin = async ({ email, password }: LoginPropType) => {
  const options = {
    method: "POST",
    options: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  };
  const url = "http://localhost:3020/customers/login";

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: (await response.json()) as ErrorResonse,
    };
    throw new Error(`HTMLError: ${JSON.stringify(error)}`);
  }

  const data = (await response.json()) as LoginResponseType;
  return data;
};

export const sendRegister = async ({
  email,
  name,
  password,
}: RegisterPropType) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  };
  const url = "http://localhost:3020/customers/register";

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = {
      status: response.status,
      statusText: response.statusText,
      response: (await response.json()) as ErrorResonse,
    };
    throw new Error(`HTMLError: ${JSON.stringify(error)}`);
  }

  const data = (await response.json()) as RegisterResponseType;
  return data;
};
