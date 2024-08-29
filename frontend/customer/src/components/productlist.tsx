import { Product } from "../utils/types";
import ProductItem from "./product";

interface Props {
  products: Product[];
  color: string;
  overflow: boolean;
}

const ProductList = ({ products, color, overflow }: Props) => {
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
        <div className="flex justify-center h-full w-full items-center">
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
