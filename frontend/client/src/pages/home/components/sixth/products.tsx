import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../first/fetchProducts";
import Loader from "../../../../components/loader";
import { ResponseType } from "../first/types";
import { Link } from "react-router-dom";
import ProductItem from "../first/productItem";

const SixthProducts = () => {
  const query = useQuery(["products", { page: 4, limit: 12 }], fetchProducts);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const data = query.data as ResponseType;

  return (
    <div className="lg:h-732">
      {data.products.length > 0 ? (
        <ul className="w-full h-full flex md:flex-row flex-col items-center justify-center flex-wrap gap-8">
          {data.products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductItem product={product} color="white" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <h3 className="text-2xl text-center text-black">
            No Products Have Been Posted Yet!
          </h3>
        </div>
      )}
    </div>
  );
};
export default SixthProducts;
