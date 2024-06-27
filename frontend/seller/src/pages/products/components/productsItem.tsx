import { Product } from "../pageTypes";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  return (
    <div>
      <Link
        to={`/products/${product.id}`}
        className="flex justify-start items-start gap-4 border-b md:border-r md:border-t-0 border-t border-black md:w-500 w-11/12 md:mx-0 mx-auto py-2 px-4 rounded-lg shadow-sm hover:shadow-xl"
      >
        <div>
          <img
            src={product.images[0].imageUrl}
            alt={product.name}
            className="w-40 h-40 rounded shadow-lg"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p>{product.category.split("_").join(" ")}</p>
          <p className="mt-4">
            Price: <span className="font-bold">{product.price}.00</span>
          </p>
          <div className="flex justify-start items-center gap-4">
            <p>
              Stock: <span className="font-bold">{product.stock}</span>
            </p>
            <p>
              Sales: <span className="font-bold">{product.sales}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
