import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse, Misconduct } from "../../types";

export const sendNewMisconduct = async ({
  email,
  misconduct,
  action,
  description,
  role,
}: {
  email: string;
  misconduct: string;
  action: string;
  description: string;
  role: "staff" | "customer" | "seller" | "";
}) => {
  try {
    const url = `${apiProtocol}://${apiHost}/staff/misconducts`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, misconduct, action, description, role }),
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

    const data = (await response.json()) as {
      message: string;
      misconduct: Misconduct;
    };
    console.log("New Misconduct:\n ", data);
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
