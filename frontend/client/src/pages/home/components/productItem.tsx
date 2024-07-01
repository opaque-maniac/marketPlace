import { Link } from "react-router-dom";
import CartIcon from "../../../../components/icons/cartIcon";
import { Product } from "./first/types";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div>
      <div className="h-250 w-270 relative">
        <div className="absolute left-2 top-2 w-10 h-8 bg-red-500 rounded"></div>
        <img
          className="w-full h-full"
          src={product.images[0].imageUrl}
          alt={product.name}
        />
        <div className="h-41">
          <button className="h-full w-full flex justify-center items-center bg-black">
            <div className="h-10 w-10 text-white">
              <CartIcon />
            </div>
            <p>Add To Cart</p>
          </button>
        </div>
      </div>
      <div className="h-100 w-270">
        <p className="text-lg font-bold">{product.name}</p>
        <div className="flex justify-around items-center">
          <span className="text-lg text-red-500">{product.price}</span>
        </div>
        <p className="text-lg text-black">{product.stock} left.</p>
      </div>
    </div>
  );
};

export default ProductItem;
