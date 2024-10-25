import { getAccessToken } from "../cookies";
import { tokenError } from "../errors";
import { ErrorResponse, SuccessUpdateProductRespnse } from "../types";

export const updateProduct = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  try {
    const url = `http://localhost:3020/staff/products/${id}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(JSON.stringify(error));
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    }

    const data = (await response.json()) as SuccessUpdateProductRespnse;
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const sendDeleteProduct = async (id: string) => {
  try {
    const url = `http://localhost:3020/staff/products/${id}`;

    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const error = (await response.json()) as ErrorResponse;
        throw new Error(JSON.stringify(error));
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    }

    const data = (await response.json()) as { message: string };
    return data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
