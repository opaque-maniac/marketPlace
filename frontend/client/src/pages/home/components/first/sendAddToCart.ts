import { getSellerCookie } from "../../../../utils/cookieStore";
import { AddToCartRes } from "../../../individualProduct/types";

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

  const data = (await res.json()) as AddToCartRes;
  return data;
};

export default sendAddToCart;
