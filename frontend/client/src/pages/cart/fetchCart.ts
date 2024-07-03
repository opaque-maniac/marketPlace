import { getSellerCookie } from "../../utils/cookieStore";

const fetchCart = async () => {
  const url = "http://localhost:3000/api-client/cart";
  const token = getSellerCookie();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Erro code - ${response.status}`);
  }

  return response.json();
};

export default fetchCart;
