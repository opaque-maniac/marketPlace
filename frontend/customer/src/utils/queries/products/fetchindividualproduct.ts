import { SuccessProductResponse } from "../../types";
import { apiHost, apiProtocol } from "../../generics";
import { QueryFunction } from "@tanstack/react-query";
import { baseQueryFunction } from "../base-query";

export const fetchProduct: QueryFunction<
  SuccessProductResponse,
  ["product", string]
> = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    const url = `${apiProtocol}://${apiHost}/customers/products/${id}`;

    return baseQueryFunction<SuccessProductResponse>({
      url,
    });
  } catch (e) {
    throw e;
  }
};
