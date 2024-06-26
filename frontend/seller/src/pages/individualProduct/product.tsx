import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchProduct from "./components/fetchProduct";
import Loader from "../../components/loader";
import { ProductResponse } from "./pageTypes";
import ProductImages from "./components/productImages";

const IndividualProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id) {
    navigate("/error/404", { replace: true });
  }

  const response = useQuery(["product", id as string], fetchProduct);

  if (response.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (response.isError) {
    const error = response.error as Error;
    return (
      <div>
        <div>
          <h1>{error.message}</h1>
        </div>
      </div>
    );
  }

  const data = response.data as ProductResponse;

  return (
    <section>
      <div>
        <ProductImages images={data.product.images} name={data.product.name} />
      </div>
      <div>
        <h1>{data.product.name}</h1>
      </div>
    </section>
  );
};

export default IndividualProduct;
