import { Product } from "../../utils/types";
import Loader from "../loader";
import { lazy, Suspense } from "react";

const ProductItem = lazy(() => import("./product"));

const ProductLoader = ({ color }: { color: string }) => {
  return (
    <div className="w-[270px] h-[350px] flex justify-center items-center">
      <div className="w-10 h-10">
        <Loader color={color} />
      </div>
    </div>
  );
};

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
  const justify =
    overflow === true
      ? "justify-start"
      : "md:justify-start justify-center flex-wrap";
  const scrollColor = color === "white" ? "scroll-black" : "scroll-white";
  const overflowStyle = overflow
    ? "overflow-x-auto scroll-mod overflow-y-hidden pb-2"
    : "flex-wrap md:flex-row flex-col";
  const align = center ? "items-center" : "md:items-start items-center";
  const gap = full ? "lg:gap-16 md:gap-36" : "";

  return (
    <div className="h-full w-full">
      {products.length > 0 ? (
        <ul
          className={`flex h-full ${justify} ${align} gap-6 ${gap} ${scrollColor} ${overflowStyle}`}
        >
          {products.map((product) => (
            <li key={product.id}>
              <Suspense
                fallback={
                  <ProductLoader color={color === "white" ? "#fff" : "#000"} />
                }
              >
                <ProductItem product={product} color={color} />
              </Suspense>
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
            No Products Have Been Posted Yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
