import { getSellerCookie } from "../../../utils/cookieStore";
import { CommentData } from "../types";

const sendComment = async (data: CommentData) => {
  const { id, content } = data;
  const url = `http://localhost:3000/api-client/products/${id}/comments`;
  const token = getSellerCookie();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  };

  const response = await fetch(url, options);

  return response.json();
};

export default sendComment;
