import { getSellerCookie } from "../../../../utils/cookieStore";

const sendAddToCart = async (id: string) => {
  const url = `http://localhost:3000/api-client/cart/${id}`;
  const token = getSellerCookie();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(url, options);

  return res.json();
};

export default sendAddToCart;
