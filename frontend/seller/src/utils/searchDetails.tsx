import { apiHost, apiProtocol } from "./generics";

const err = JSON.stringify({
  message: "Internal server error",
  errorCode: "S500",
});

export const getSearchRoute = () => {
  const pathname = window.location.pathname;
  const base = `${apiProtocol}://${apiHost}/seller`;

  if (pathname.includes("orders")) {
    return `${base}/orders/search`;
  }

  return `${base}/products/search`;
};

// If null is returned, go to 500
export const getSearchRender = () => {
  const pathname = window.location.pathname;

  if (pathname.includes("orders")) {
    return "orders";
  }
  return "products";
};
