import { Link } from "react-router-dom";
import { Product } from "../utils/types";
import HeartIcon from "./icons/heart";
import useUserStore from "../utils/store";
import AddToCart from "../pages/product/addtocart";

interface Props {
  product: Product;
  color: string;
}

const ProductItem = ({ product, color }: Props) => {
  const user = useUserStore.getState().user;

  const calculateOriginalPrice = (
    price: number,
    discountPercentage: number,
  ): number => {
    const discountAmount = price * (discountPercentage / 100);
    const originalPrice = price + discountAmount;
    return originalPrice;
  };

  return (
    <div className="h-350">
      <Link to={`/products/${product.id}`}>
        <div className="h-250 w-270 relative pt-1">
          <img
            src={`http://localhost:3020/${product.images[0].url}`}
            alt={product.name}
            className="h-full w-full"
          />
          <div className="absolute top-4 right-4">
            <button
              disabled={!user}
              title={user ? "Add To Wishlist" : "Log In To Take This Action"}
              aria-label="Add To Wishlist"
              className="h-8 w-8 bg-white rounded-full pl-1 pr-1"
            >
              <HeartIcon />
            </button>
          </div>
        </div>
        <div>
          <p className={`text-${color} text-xl text-center`}>{product.name}</p>
        </div>
        <div className="flex justify-around items-center py-1">
          <span className="text-red-400">${product.price.toFixed(2)}</span>
          <span
            className={`${color === "white" ? "text-gray-200" : "text-gray-400"} line-through`}
          >
            $
            {calculateOriginalPrice(
              product.price,
              product.discountPercentage,
            ).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <AddToCart
            id={product.id}
            color={color}
            text={color == "black" ? "white" : "black"}
          />
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
