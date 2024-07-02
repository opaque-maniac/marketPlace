import { getSellerCookie } from "../../../utils/cookieStore";

interface WishItem {
  id: string;
  favoriteId: string;
  productId: string;
  dateCreated: Date;
}

interface ResponseType {
  message: string;
  favoriteItem: WishItem;
}

const sendAddToWishlist = async (id: string) => {
  const url = `http://localhost:3000/api-client/favorites/${id}`;
  const token = getSellerCookie();
  const options = {
    method: "POST",
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as ResponseType;
  return data;
};

export default sendAddToWishlist;
