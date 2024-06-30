import { QueryFunctionContext } from "@tanstack/react-query";
import { QueryKeyType } from "./types";

const fetchProducts = async ({
  queryKey,
}: QueryFunctionContext<[string, QueryKeyType]>) => {
  const [, { page, limit }] = queryKey;
  const url = `http://localhost:3000/api-client/products?page=${page}&itemsPerPage=${limit}`;
  const response = await fetch(url);
  return response.json();
};

export default fetchProducts;
