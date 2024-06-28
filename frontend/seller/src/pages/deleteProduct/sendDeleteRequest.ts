import { getSellerCookie } from "../../utils/cookieStore";
import { DeleteResponse } from "./pageTypes";

const sendDeleteProduct = async (id: string | undefined) => {
  if (!id) {
    console.log("No id");
    return;
  }

  const token = getSellerCookie();
  const url = `http://localhost:3000/api-seller/products/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  if (response.status !== 204) {
    const data = (await response.json()) as DeleteResponse;
    return data;
  }
  return { message: "Product deleted successfully" } as { message: string };
};

export default sendDeleteProduct;
