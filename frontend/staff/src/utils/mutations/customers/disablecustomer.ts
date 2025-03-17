import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse } from "../../types";

export const disableCustomer = async ({
  id,
  misconductId,
}: {
  id: string;
  misconductId: string;
}) => {
  try {
    const url = `${apiProtocol}://${apiHost}/staff/customers/${id}/disable?misconduct=${misconductId}`;
    const token = getAccessToken();
    console.log(url);

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

    const data = (await response.json()) as {
      message: string;
    };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
