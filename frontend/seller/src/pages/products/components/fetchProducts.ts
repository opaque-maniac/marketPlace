import { QueryFunctionContext } from "@tanstack/react-query";
import { getSellerCookie } from "../../../utils/cookieStore";

const fetchProducts = async ({
  queryKey,
}: QueryFunctionContext<[string, number]>) => {
  const [, page] = queryKey;

  const token = getSellerCookie();
  const url = `http://localhost:3000/api-seller/products?page=${page}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer`,
    },
  };

  const response = await fetch(url, options);
  return response.json();
};

export default fetchProducts;
