import { getSellerCookie } from "../../../utils/cookieStore";
import { ProductResponse } from "../pageTypes";

const submitNewProduct = async (data: FormData) => {
  const token = getSellerCookie();
  const url = "http://localhost:3000/api-seller/products";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  const request = await fetch(url, options);
  const response = (await request.json()) as ProductResponse;
  return response;
};

export default submitNewProduct;
