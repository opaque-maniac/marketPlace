import { SuccessProductRatings } from "../../types";
import { apiHost, apiProtocol } from "../../generics";
import { baseQueryFunction } from "../base-query";

// Fetch a single product
export const fetchProductRatings = async (id: string) => {
  try {
    const url = `${apiProtocol}://${apiHost}/customers/products/${id}/ratings`;

    const data = await baseQueryFunction<SuccessProductRatings>({
      url,
      authenticate: true,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
