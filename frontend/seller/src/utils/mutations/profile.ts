import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";
import { ErrorResponse, SuccessSellerResponse } from "../types";

export const sendUpdateProfile = async ({
  data,
  id,
}: {
  data: FormData;
  id: string;
}) => {
  try {
    const url = `http://localhost:3020/seller/profile/${id}`;

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
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    const json = (await response.json()) as SuccessSellerResponse;
    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const sendDeleteProfile = async (id: string) => {
  try {
    const url = `http://localhost:3020/seller/profile/${id}`;

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
      const json = (await response.json()) as ErrorResponse;
      throw new Error(JSON.stringify(json));
    }

    const json = (await response.json()) as SuccessSellerResponse;
    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
