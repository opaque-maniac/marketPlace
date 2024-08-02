import { useQuery } from "@tanstack/react-query";
import fetchProducts from "./fetchProducts";
import Loader from "../../../../components/loader";
import { ResponseType } from "./types";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "./productItem";
import { useContext } from "react";
import ErrorContext from "../../../../utils/errorContext";

const FirstProducts = () => {
  const query = useQuery(["products", { page: 1, limit: 6 }], fetchProducts);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  if (query.isLoading) {
    return (
      <div className="h-350 w-full flex justify-center items-center">
        <div className="h-10 w-10">
          <Loader />
        </div>
      </div>
    );
  }

  if (query.isError) {
    setError(true);
    navigate("/error/500");
  }

  const data = query.data as ResponseType;

  return (
    <div className="lg:w-900 md:w-10/12 bg-black h-350 w-11/12 flex items-center">
      {data.products && data.products.length > 0 ? (
        <div className="lg:w-900 w-11/12">
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
export default FirstProducts;
