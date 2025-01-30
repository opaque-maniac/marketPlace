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
          <div>
            <p className="text-xl text-center">{product.name}</p>
          </div>
          <div className="w-full flex justify-evenly items-center">
            <span className="text-red-400">
              ${product.sellingPrice.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through">
              ${product.buyingPrice.toFixed(2)}{" "}
            </span>
          </div>
          <div>
            <p className="font-bold text-center">{product.category}</p>
          </div>
        </div>
      </Link>
    </Transition>
  );
};

export default ProductItem;
