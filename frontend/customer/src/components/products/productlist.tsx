import { useLocation } from "react-router-dom";
import { Product } from "../../utils/types";
import ProductItem from "./product";

interface Props {
  products: Product[];
  color: string;
  overflow: boolean;
  full: boolean;
  center?: boolean;
  zeroHeight?: string;
}

const ProductList = ({
  products,
  color,
  overflow,
  full,
  center,
  zeroHeight = "auto",
}: Props) => {
  const { pathname } = useLocation();

  const justify =
    overflow === true ? "justify-start" : "justify-center lg:gap-10 md:gap-20";
  const scrollColor = color == "white" ? "scroll-black" : "scroll-white";
  const overflowStyle = overflow
    ? "overflow-x-auto scroll-mod overflow-y-hidden pb-2"
    : "flex-wrap md:flex-row flex-col";
  const align = center ? "items-center" : "md:items-start items-center";

  return (
    <div className="h-full w-full">
      {products.length > 0 ? (
        <ul
          className={`flex h-full ${justify} ${align} gap-4 ${scrollColor} ${overflowStyle}`}
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
          style={{ minHeight: full ? "calc(100vh - 1.4rem )" : zeroHeight }}
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
