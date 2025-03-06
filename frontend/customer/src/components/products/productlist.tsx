import { Link } from "react-router-dom";
import { Product } from "../../utils/types";
import Loader from "../loader";
import { lazy, Suspense } from "react";

const ProductItem = lazy(() => import("./product"));

const ProductLoader = ({ color, url }: { color: string; url: string }) => {
  const border = color === "#fff" ? "black" : "white";

  return (
    <Link
      to={url}
      className={`w-[270px] h-[350px] flex justify-center items-center border border-${border}`}
    >
      <div className="w-8 h-8">
        <Loader color={color} />
      </div>
    </Link>
  );
};

interface Props {
  products: Product[];
  color: string;
  overflow: boolean;
  zeroHeight?: string;
}

const ProductList = ({
  products,
  color,
  overflow,
  zeroHeight = "auto",
}: Props) => {
  const display =
    overflow === true
      ? "flex justify-start items-center gap-16"
      : "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1";
  const scrollColor = color === "white" ? "scroll-black" : "scroll-white";
  const overflowStyle = overflow
    ? "overflow-x-auto scroll-mod overflow-y-hidden pb-2"
    : "flex-wrap md:flex-row flex-col";

  return (
    <div className="h-full w-full">
      {products.length > 0 ? (
        <ul className={`${display} gap-6 ${scrollColor} ${overflowStyle}`}>
          {products.map((product) => (
            <li
              key={product.id}
              className={!overflow ? "mx-auto md:mb-8 mb-6" : ""}
            >
              <Suspense
                fallback={
                  <ProductLoader
                    url={`/products/${product.id}`}
                    color={color === "white" ? "#fff" : "#000"}
                  />
                }
              >
                <ProductItem product={product} color={color} />
              </Suspense>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex justify-center w-full items-center"
          style={{ height: zeroHeight ?? "100%" }}
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
