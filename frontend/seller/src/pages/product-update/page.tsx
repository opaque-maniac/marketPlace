import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products/fetchindividualproduct";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import PageLoader from "../../components/pageloader";
import Loader from "../../components/loader";

const UpdateProductForm = lazy(
  () => import("../../components/edit-product/form"),
);

const Fallback = () => {
  return (
    <div
      aria-label="Loading"
      className="xl:w-7/12 lg:w-8/12 md:w-10/12 w-11/12 h-[380px] flex justify-center items-center"
    >
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryKey: ["product", id as string],
    queryFn: fetchIndividualProduct,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const { data } = query;
  const product = data?.product;

  return (
    <Transition>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="User's current products" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      {query.isLoading ? (
        <PageLoader />
      ) : (
        <main role="main" className="h-full md:pt-20 pt-12 relative pb-6">
          <p className="absolute top-4 left-4">
            Home / <span className="font-semibold">Update Product</span>
          </p>
          {product && (
            <Suspense fallback={<Fallback />}>
              <UpdateProductForm product={product} />{" "}
            </Suspense>
          )}
        </main>
      )}
    </Transition>
  );
};

export default ProductPage;
