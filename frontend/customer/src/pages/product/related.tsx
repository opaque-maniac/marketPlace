import { useQuery } from "@tanstack/react-query";
import { fetchRelatedProducts } from "../../utils/queries/products";
import { ErrorResponse, Product } from "../../utils/types";
import Loader from "../../components/loader";
import ProductList from "../../components/productlist";
import errorHandler from "../../utils/errorHandler";
import { useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";

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
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const [show, url] = errorHandler(error.errorCode);
      if (show) {
        setErr(error.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        } else {
          setError(true);
          navigate("/500", { replace: true });
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const productData = query.data?.data || [];
  const products = productData.filter((p: Product) => p.id !== product.id);

  return (
    <div className="h-full w-full pb-4">
      {products && products.length > 0 && (
        <ProductList
          products={products}
          overflow={true}
          color="black"
          full={false}
        />
      )}
      {products && products.length === 0 && (
        <div className="flex justify-center h-full w-full items-center">
          <p className="text-2xl font-semibold text-wrap text-center text-black">
            No Related Products Found
          </p>
        </div>
      )}
    </div>
  );
};
export default Related;
