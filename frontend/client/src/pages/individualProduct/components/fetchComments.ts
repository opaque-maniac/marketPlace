import { QueryFunctionContext } from "@tanstack/react-query";

interface Prop {
  id: string;
  page: number;
}

const fetchComments = async ({
  queryKey,
}: QueryFunctionContext<[string, Prop]>) => {
  const id = queryKey[1].id;
  const page = queryKey[1].page;

  const url = `http://localhost:3000/api-client/products/${id}/comments?page=${page}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  return response.json();
};

export default fetchComments;
