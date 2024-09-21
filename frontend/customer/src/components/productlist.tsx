import { useLocation } from "react-router-dom";
import { Product } from "../utils/types";
import ProductItem from "./product";

interface Props {
  products: Product[];
  color: string;
  overflow: boolean;
}

function makeFull(path: string) {
  if (
    path.includes("explore") ||
    path.includes("search") ||
    path.includes("categories") ||
    path.includes("wishlist") ||
    path.includes("cart")
  ) {
    return true;
  }
  return false;
}

const ProductList = ({ products, color, overflow }: Props) => {
  const { pathname } = useLocation();

  const full = makeFull(pathname);

  return (
    <div className="h-full w-full">
      {products.length > 0 ? (
        <ul
          className={`flex h-full justify-start items-center gap-4 ${color == "white" ? "scroll-black" : "scroll-white"} ${overflow ? "overflow-x-auto scroll-mod overflow-y-hidden pb-2" : "flex-wrap md:flex-row flex-col"}`}
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} color={color} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex justify-center h-full w-full items-center"
          style={{ minHeight: full ? "calc(100vh - 1.4rem )" : "auto" }}
        >
          <p
            className={`text-2xl font-semibold text-wrap text-center text-${color}`}
          >
            {pathname.includes("wishlist")
              ? "No products in your wishlist"
              : "No Products Have Been Posted Yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
