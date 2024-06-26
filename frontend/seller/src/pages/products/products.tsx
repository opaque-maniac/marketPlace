import { Link } from "react-router-dom";
import ProductsList from "./components/productsList";

const ProductsPage = () => {
  return (
    <div>
      <div>
        <Link to={"/products/new"}>
          <button>New Product</button>
        </Link>
      </div>
      <h2>Products</h2>
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
