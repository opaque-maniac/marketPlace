import { QueryFunctionContext } from "@tanstack/react-query";
import { getSellerCookie } from "../../../utils/cookieStore";

interface PropType {
  limit: number;
  category: string;
}

const fetchRelatedProducts = async ({
  queryKey,
}: QueryFunctionContext<[string, PropType]>) => {
  const [, prop] = queryKey;
  const { limit, category } = prop;
  const url = `http://localhost:3000/api-client/products?category=${category}&limit=${limit}`;
  const token = getSellerCookie();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(url, options);
  return res.json();
};

export default fetchRelatedProducts;
