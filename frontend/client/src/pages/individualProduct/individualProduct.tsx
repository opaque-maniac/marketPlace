import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchProduct from "./fetchProduct";
import { ProdResponseType } from "./types";
import IndividualProductItem from "./components/product";
import Loader from "../../components/loader";
import RelatedProducts from "./components/related";
import { useContext } from "react";
import ErrorContext from "../../utils/errorContext";
import ProductComment from "./components/productComments";

const IndividualProduct = () => {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const { id } = useParams();

  if (!id) {
    navigate("/error/404", { replace: true });
  }

  const query = useQuery(["product", id as string], fetchProduct);

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

  const data = query.data as ProdResponseType;

  if (data.message === "Product not found") {
    navigate("/error/404", { replace: true });
  }

  return (
    <div className="lg:w-1200 md:mx-auto pt-8 lg:px-0 px-2 pb-4">
      <div>
        <IndividualProductItem product={data.product} />
      </div>
      <div className="h-16"></div>
      <div>
        <ProductComment id={data.product.id} />
      </div>
      <div className="h-16"></div>
      <div>
        <RelatedProducts category={data.product.category} />
      </div>
    </div>
  );
};

export default IndividualProduct;
