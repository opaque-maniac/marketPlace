import { useQuery } from "@tanstack/react-query";
import fetchRelatedProducts from "./fetchRelated";
import Loader from "../../../components/loader";
import { ResponseType } from "../../home/components/first/types";
import NoProducts from "../../login/components/noPoducts";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../../home/components/first/productItem";
import { useContext } from "react";
import ErrorContext from "../../../utils/errorContext";

interface Props {
  category: string;
}

const RelatedProducts = ({ category }: Props) => {
  const query = useQuery(
    ["related", { limit: 6, category }],
    fetchRelatedProducts
  );
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (query.isError) {
    setError(true);
    navigate("/error/500", { replace: true });
  }

  const data = query.data as ResponseType;

  return (
    <section className="h-350 mb-8">
      <div className="flex justify-start items-center gap-4">
        <div className="h-8 w-4 roundend animate-bounce bg-red-500 rounded-lg"></div>
        <p className="text-red-500">Related Products</p>
      </div>
      {data.products && data.products.length > 0 ? (
        <ul
          className="flex justify-start items-center h-full overflow-x-scroll"
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
        <div className="text-black">
          <NoProducts />
        </div>
      )}
    </section>
  );
};

export default RelatedProducts;
