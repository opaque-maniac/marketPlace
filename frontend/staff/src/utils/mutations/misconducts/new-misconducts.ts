import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse, Misconduct } from "../../types";

export const sendNewMisconduct = async ({
  email,
  misconduct,
  action,
  description,
}: {
  email: string;
  misconduct: string;
  action: string;
  description: string;
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
      body: JSON.stringify({ email, misconduct, action, description }),
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
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
