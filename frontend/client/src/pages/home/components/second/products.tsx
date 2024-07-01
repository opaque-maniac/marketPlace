import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../first/fetchProducts";
import Loader from "../../../../components/loader";
import { ResponseType } from "../first/types";
import { Link } from "react-router-dom";
import ProductItem from "./productItem";

const SecondProducts = () => {
  const query = useQuery(["products", { page: 2, limit: 6 }], fetchProducts);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const data = query.data as ResponseType;

  return (
    <div className="h-350">
      {data.products.length > 0 ? (
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
              <Link to={`/product/${product.id}`}>
                <ProductItem product={product} />
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
