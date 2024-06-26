import { Product } from "../pageTypes";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  return (
    <div>
      <Link to={`/products/${product.id}`}>
        <div>
          <img src={product.images[0].imageUrl} alt={product.name} />
        </div>
        <div>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
