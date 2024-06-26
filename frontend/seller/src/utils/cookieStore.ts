import Cookies from "universal-cookie";

const hazinaSellerCookie = new Cookies();

export const setSellerCookie = (token: string) => {
  hazinaSellerCookie.set("seller", token, { path: "/" });
};

export const removeSellerCookie = () => {
  hazinaSellerCookie.remove("seller", { path: "/" });
};

export const getSellerCookie = () => {
  const token = hazinaSellerCookie.get("seller") as string;
  return token;
};
