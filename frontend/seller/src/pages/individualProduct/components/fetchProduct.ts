import { QueryFunctionContext } from "@tanstack/react-query";
import { getSellerCookie } from "../../../utils/cookieStore";

const fetchProduct = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;

  const token = getSellerCookie();
  const url = `http://localhost:3000/api-seller/products/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  return response.json();
};

export default fetchProduct;
