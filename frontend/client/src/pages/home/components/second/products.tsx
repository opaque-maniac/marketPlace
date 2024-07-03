import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../first/fetchProducts";
import Loader from "../../../../components/loader";
import { ResponseType } from "../first/types";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../first/productItem";
import { useContext } from "react";
import ErrorContext from "../../../../utils/errorContext";

const SecondProducts = () => {
  const query = useQuery(["products", { page: 2, limit: 6 }], fetchProducts);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  if (query.isLoading) {
    return (
      <div>
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
    <div className="h-350">
      {data.products && data.products.length > 0 ? (
        <ul
          className="flex justify-start items-center overflow-x-scroll gap-4 mx-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarGutter: "inherit",
            scrollbarColor: "#000000 #ffffff",
          }}
        >
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
          <h3 className="text-2xl text-center">
            No Products Have Been Posted Yet!
          </h3>
        </div>
      )}
    </div>
  );
};
export default SecondProducts;
