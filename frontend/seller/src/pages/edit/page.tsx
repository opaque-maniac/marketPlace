import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products";
import { FormEventHandler, useContext, useEffect } from "react";
import Loader from "../../components/loader";
import ProductForm from "./form";
import { useMutation } from "@tanstack/react-query";
import { sendUpdateProduct } from "../../utils/mutations/products";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";

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
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const mutation = useMutation({
    mutationFn: sendUpdateProduct,
    onSuccess: (data) => {
      if (data) {
        navigate(`/products/${id}`);
      } else {
        setError(true);
        navigate("/500", { replace: true });
      }
    },
    onError: (error) => {
      try {
        const errorObj = JSON.parse(error.message) as ErrorResponse;
        const [show, url] = errorHandler(errorObj.errorCode);

        if (show) {
          setErr(errorObj.message);
        } else {
          if (url) {
            if (url === "/500") {
              setError(true);
            }
            navigate(url, { replace: true });
          } else {
            setError(true);
            navigate("/500", { replace: true });
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          setErr("Something unexpected happened");
        }
        navigate("/", { replace: true });
      }
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({ data: formData, id: id as string });
  };

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
                <ProductForm
                  product={query.data.product}
                  handler={submitHandler}
                  isLoading={mutation.isPending}
                />
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
