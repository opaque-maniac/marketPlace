import { Link } from "react-router-dom";
import { Product } from "../../utils/types";
import AddToCart from "../../pages/product/addtocart";
import EyeOpen from "../icons/show";
import { useState } from "react";
import Modal from "../modal";
import CloseIcon from "../icons/closeIcon";

interface Props {
  product: Product;
  color: string;
}

const ProductItem = ({ product, color }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

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
            loading="lazy"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setClicked(true);
              }}
              aria-label="Add To Wishlist"
              className="h-8 w-8 bg-white rounded-full pl-1 pr-1"
            >
              <EyeOpen />
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
      {clicked && (
        <Modal callback={() => setClicked(false)}>
          <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setClicked(false);
              }}
              className="absolute md:-left-20 md:top-10 top-2 left-0 h-8 w-8 bg-white border border-black rounded-sm"
            >
              <CloseIcon />
            </button>
            <img
              src={`http://localhost:3020/${product.images[0].url}`}
              alt={product.name}
              loading="lazy"
              className="w-full h-500"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
