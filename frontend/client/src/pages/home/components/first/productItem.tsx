import { Product } from "./types";
import AddToCartButton from "./addToCartButton";
import clsx from "clsx";

interface Props {
  product: Product;
  color: string;
}

const ProductItem = ({ product, color = "black" }: Props) => {
  return (
    <div>
      <div className="w-270 relative">
        <div className="absolute left-9 top-0 w-10 h-8 bg-red-500 rounded flex justify-center items-center">
          <span className="font-semibold text-sm">{`-${product.discountPercentage}%`}</span>
        </div>
        <img
          className="w-full"
          src={product.images[0].imageUrl}
          alt={product.name}
          style={{ objectFit: "scale-down", height: "200px" }}
        />
      </div>
      <div className="h-100 w-270">
        <p
          className={clsx("text-base text-center font-semibold py-2", {
            "text-white": color === "black",
            "text-black": color === "white",
          })}
        >
          {product.name}
        </p>
        <div>
          <AddToCartButton
            id={product.id}
            color={color === "white" ? "black" : "white"}
          />
        </div>
        <div className="flex justify-around items-center py-2">
          <span className="text-base text-red-500">${product.price}</span>
          <span className="text-base text-gray-600 line-through">
            $
            {(
              (100 * product.price) /
              (100 - product.discountPercentage)
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
