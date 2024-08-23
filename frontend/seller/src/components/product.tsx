import { Link } from "react-router-dom";
import { Product } from "../utils/types";
import Transition from "./transition";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  return (
    <Transition>
      <Link to={`/products/${product.id}`}>
        <div>
          <div>
            <img src={product.images[0].url} alt={product.name} />
          </div>
          <div>
            <p>{product.name}</p>
          </div>
          <div>
            <span>${`${product.price}`}</span>
            <span>
              $
              {product.price -
                (product.price * product.discountPercentage) / 100}
            </span>
          </div>
        </div>
      </Link>
    </Transition>
  );
};

export default ProductItem;
