import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { ErrorResponse } from "../../types";

export const updateCustomer = async ({
  data,
  id,
}: {
  id: string;
  data: FormData;
}) => {
  try {
    const url = `${apiProtocol}://${apiHost}/staff/customers/${id}`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
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

    const returnData = (await response.json()) as {
      message: string;
    };
    return returnData;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
