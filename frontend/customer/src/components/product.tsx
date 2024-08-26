import { Link } from "react-router-dom";
import { Product } from "../utils/types";
import Transition from "./transition";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  return (
    <Transition>
      <Link
        style={{
          width: "270px",
          height: "350px",
        }}
        className="block p-0 m-0"
        to={`/products/${product.id}`}
      >
        <div className="w-full h-full border">
          <div style={{ width: "270px", height: "250px" }}>
            <img
              src={`http://localhost:3020/${product.images[0].url}`}
              alt={product.name}
              className="w-full mx-auto h-full"
            />
          </div>
          <div className="flex justify-start items-center py-1 pl-4">
            <p className="text-xl">{product.name}</p>
          </div>
          <div className="w-full flex justify-start items-center gap-20 pl-4">
            <span className="text-red-400">${`${product.price}`}</span>
            <span className="text-gray-400 line-through">
              $
              {product.price -
                (product.price * product.discountPercentage) / 100}
            </span>
          </div>
          <div className="flex justify-start pl-4 items-center">
            <p className="font-bold">{product.category}</p>
          </div>
        </div>
      </Link>
    </Transition>
  );
};

export default ProductItem;
