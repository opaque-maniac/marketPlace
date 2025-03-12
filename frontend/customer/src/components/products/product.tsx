import { Link } from "react-router-dom";
import { Product } from "../../utils/types";
import AddToCart from "../product/addtocart";
import { apiHost, apiProtocol } from "../../utils/generics";
import ProductWishlistButton from "./productwishlitbutton";
import { calculateDiscount } from "../../utils/price";

interface Props {
  product: Product;
  border?: "white" | "black";
  color: string;
}

const ProductItem = ({ product, color, border }: Props) => {
  const discount = calculateDiscount(product.buyingPrice, product.sellingPrice);

  return (
    <div>
      <Link
        to={`/products/${product.id}`}
        className={`block min-h-[350px] relative w-[270px] rounded-tr-md ${
          border === "white"
            ? "border border-white rounded-tr-md"
            : border === "black"
              ? "border rounded-tr-md"
              : ""
        } ${border ? "pb-0" : ""}`}
      >
        <div>
          <div
            className={`${
              border ? "h-[240px]" : "h-[250px]"
            } w-[270px] flex items-end justify-center pb-4`}
          >
            <img
              src={`${apiProtocol}://${apiHost}/${product.images[0].url}`}
              alt={product.name}
              className="h-[220px] w-[230px]"
              loading="lazy"
            />
          </div>
          <div
            className={`absolute top-0 ${
              border ? "right-0" : "right-1"
            } bg-red-600 h-10 w-10 rounded-tr-md rounded-bl-md flex justify-center items-center`}
          >
            <span
              aria-label={`${discount}% discount`}
              className="font-semibold text-white"
            >
              {discount}%
            </span>
          </div>
          <div className="absolute top-14 right-2">
            <ProductWishlistButton productID={product.id} />
          </div>
        </div>
        <div>
          <p className={`text-${color} text-xl text-center`}>{product.name}</p>
        </div>
        <div className="flex justify-around items-center py-1">
          <span className="text-red-400">
            {product.sellingPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </span>
          <span
            className={`${color === "white" ? "text-gray-200" : "text-gray-400"} line-through`}
          >
            {product.buyingPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
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
