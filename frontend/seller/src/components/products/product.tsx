import { Link } from "react-router-dom";
import { Product } from "../../utils/types";
import { calculateDiscount } from "../../utils/discount";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const discount = calculateDiscount(product.buyingPrice, product.sellingPrice);

  return (
    <Link
      className="block w-[270px] h-[350px] border relative rounded-tr-md mx-auto overflow-hidden"
      to={`/products/${product.id}`}
    >
      <div
        aria-label={`${discount} percent discount`}
        className="absolute top-0 right-0 w-10 h-10 bg-red-500 text-white rounded-tr-md rounded-bl-md flex justify-center items-center"
      >
        <span className="font-semibold">{discount}%</span>
      </div>
      <div>
        <img
          src={`http://localhost:3020/${product.images[0].url}`}
          alt={product.name}
          className="w-[270px] h-[250px] mx-auto"
        />
      </div>
      <div>
        <p className="text-center text-lg text-wrap break-words">
          {product.name}
        </p>
      </div>
      <div>
        <p className="font-semibold text-center text-sm">{product.category}</p>
      </div>
      <div className="w-full flex justify-evenly items-center">
        <span className="text-red-400">
          {product.sellingPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="text-gray-400 line-through">
          {product.buyingPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
