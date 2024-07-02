import { QueryFunctionContext } from "@tanstack/react-query";

const fetchProduct = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const [, id] = queryKey;
  const url = `http://localhost:3000/api-client/products/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);

  return res.json();
};

export default fetchProduct;
