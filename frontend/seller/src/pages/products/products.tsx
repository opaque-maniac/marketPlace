import { Link } from "react-router-dom";
import ProductsList from "./components/productsList";
import PlusIcon from "../login/components/plusIcon";

const ProductsPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center md:pt-4">Products</h2>
      <div className="flex items-center justify-start md:mt-0 mt-2">
        <Link to={"/products/new"}>
          <div className=" bg-green-400 w-40 h-10 rounded shadow-lg ml-4 hover:bg-green-500 focus:outline-none focus:bg-green-400 hover:text-white text-black transition duration-300 ease-in-out flex justify-center items-center gap-2">
            <div>
              <PlusIcon />
            </div>
            <span>Product</span>
          </div>
        </Link>
      </div>
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
