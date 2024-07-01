import CartIcon from "../../../../components/icons/cartIcon";
import { Product } from "../first/types";

const ProductItem = ({ product }: { product: Product }) => {
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
        <p className="text-base text-center font-semibold text-black py-2">
          {product.name}
        </p>
        <div>
          <button className="bg-white h-8 w-9/12 mx-auto rounded flex justify-center items-center gap-4">
            <div className="h-6 w-6">
              <CartIcon />
            </div>
            <p>Add To Cart</p>
          </button>
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
