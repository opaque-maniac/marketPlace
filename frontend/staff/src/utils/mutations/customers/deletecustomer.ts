import { getAccessToken } from "../../cookies";
import { responseError, tokenError } from "../../errors";
import { apiHost, apiProtocol } from "../../generics";
import { Customer, ErrorResponse } from "../../types";

export const deleteCustomer = async ({
  id,
  misconductId,
}: {
  id: string;
  misconductId: string;
}) => {
  try {
    const url = `${apiProtocol}://${apiHost}/staff/customers/${id}/disable?misconduct=${misconductId}`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "DELETE",
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
      customer: Customer;
    };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
