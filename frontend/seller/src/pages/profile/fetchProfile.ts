import { QueryFunctionContext } from "@tanstack/react-query";
import { getSellerCookie } from "../../utils/cookieStore";

const fetchProfile = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>) => {
  if (!queryKey[1]) {
    throw new Error("No user id provided");
  }

  const [, id] = queryKey;

  const url = `http://localhost:5000/api-sellers/profile/${id}`;
  const options = {
    method: "GET",
    options: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getSellerCookie()}`,
    },
  };

  const response = await fetch(url, options);
  return response.json();
};

export default fetchProfile;
