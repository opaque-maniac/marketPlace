import { searchTypeStore } from "../pages/search/typeStore";

const err = JSON.stringify({
  message: "Internal server error",
  errorCode: "S500",
});

export const getSearchRoute = () => {
  const type = searchTypeStore.getState().type;

  if (!type) {
    throw new Error(err);
  }

  const base = `http://localhost:3020/seller`;

  if (type === "orders") {
    return `${base}/orders/search`;
  }

  return `${base}/products/search`;
};

// If null is returned, go to 500
export const getSearchRender = () => {
  const type = searchTypeStore.getState().type;

  if (!type) {
    return null;
  }

  if (type === "orders") {
    return "orders";
  }
  return "products";
};
