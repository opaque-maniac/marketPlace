import { getAccessToken } from "../cookies";
import { responseError, tokenError } from "../errors";
import {
  ErrorResponse,
  SuccessNewProductResponse,
  SuccessProductDelete,
} from "../types";

interface NewProductProps {
  data: FormData;
}

export const sendNewProduct = async ({ data }: NewProductProps) => {
  try {
    const url = `http://localhost:3020/seller/products`;
    const token = getAccessToken();

    if (!token) {
      throw tokenError();
    }

    const options = {
      method: "POST",
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

    const json = (await response.json()) as SuccessNewProductResponse;

    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

interface UpdateProductProps {
  data: FormData;
  id: string;
}

export const sendUpdateProduct = async ({ data, id }: UpdateProductProps) => {
  try {
    const url = `http://localhost:3020/seller/products/${id}`;
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

    const json = (await response.json()) as SuccessNewProductResponse;

    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};

export const sendDeleteProduct = async (id: string) => {
  try {
    const url = `http://localhost:3020/seller/products/${id}`;
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

    const json = (await response.json()) as SuccessProductDelete;

    return json;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
    throw e;
  }
};
