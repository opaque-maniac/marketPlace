import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products/fetchindividualproduct";
import { useContext, useEffect } from "react";
import Loader from "../../components/loader";
import ProductForm from "./form";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

const EditProductPage = () => {
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
    queryFn: fetchIndividualProduct,
    queryKey: ["product", id as string],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  return (
    <Transition>
      <Helmet>
        <title>Edit Product</title>
        <meta name="description" content="Edit a product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <h2>Edit the product</h2>
        <div>
          {query.isLoading && (
            <section
              className="flex justify-center items-center"
              style={{
                minHeight: "calc(100vh - 13.8rem)",
              }}
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </section>
          )}
          {query.isSuccess && (
            <>
              {query.data && query.data.product && (
                <ProductForm product={query.data.product} />
              )}
            </>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Link className="underline" to={`/products/${id}`}>
            Cancel
          </Link>
        </div>
      </main>
    </Transition>
  );
};

export default EditProductPage;
