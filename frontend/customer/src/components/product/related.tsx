import { useQuery } from "@tanstack/react-query";
import { fetchRelatedProducts } from "../../utils/queries/products/fetchrelatedproducts";
import { Product } from "../../utils/types";
import Loader from "../../components/loader";
import ProductList from "../../components/products/productlist";
import { useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  product: Product;
}

const Related = ({ product }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchRelatedProducts,
    queryKey: ["related", product.category, 1, 10],
  });

  if (query.isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-20 w-20">
          <Loader color="#000000" />
        </div>
      </div>
    );
  }

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const productData = query.data?.data || [];
  const products = productData.filter((p: Product) => p.id !== product.id);

  return (
    <div className="h-full w-full pb-4">
      <ProductList
        products={products}
        overflow={true}
        color="black"
        full={false}
        zeroHeight="400px"
      />
    </div>
  );
};
export default Related;
