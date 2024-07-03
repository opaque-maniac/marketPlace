import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../first/fetchProducts";
import Loader from "../../../../components/loader";
import { ResponseType } from "../first/types";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../first/productItem";
import { useContext } from "react";
import ErrorContext from "../../../../utils/errorContext";

const FifthProducts = () => {
  const query = useQuery(["products", { page: 4, limit: 6 }], fetchProducts);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  if (query.isLoading) {
    return (
      <div className="bg-white">
        <Loader />
      </div>
    );
  }

  if (query.isError) {
    setError(true);
    navigate("/error/500");
  }

  const data = query.data as ResponseType;

  return (
    <div className="bg-black h-350 w-full flex items-center">
      {data.products && data.products.length > 0 ? (
        <div className="w-full">
          <ul
            className="flex overflow-x-scroll justify-start gap-4 mx-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarGutter: "inherit",
              scrollbarColor: "#333 #000000",
            }}
          >
            {data.products.map((product) => (
              <li key={product.id} className="md:px-2">
                <Link to={`/products/${product.id}`}>
                  <ProductItem product={product} color="black" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="h-full w-full text-white flex justify-center items-center">
          <h3 className="text-2xl text-center">
            No Products Have Been Posted Yet!
          </h3>
        </div>
      )}
    </div>
  );
};
export default FifthProducts;
