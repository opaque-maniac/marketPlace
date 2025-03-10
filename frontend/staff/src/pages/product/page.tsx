import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useContext, useEffect } from "react";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { fetchIndividualProduct } from "../../utils/queries/products/fetchindividualproducts";
import { errorHandler } from "../../utils/errorHandler";
import { formatDate } from "../../utils/date";
import ProductDescription from "../../components/product/description";
import ImageComponent from "../../components/product/image";
import { apiHost, apiProtocol } from "../../utils/generics";

const DeleteProductButton = lazy(
  () => import("../../components/product/deleteproductbutton"),
);
const CommentList = lazy(() => import("../../components/product/comments"));

const CommentsFallback = () => {
  return (
    <div
      aria-label="loading"
      role="banner"
      className="flex justify-center items-center md:w-11/12 w-10/12 border md:mx-0 mx-auto h-64"
    >
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

const ButtonFallback = () => {
  return (
    <button
      className="bg-red-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
      disabled
    >
      <div className="h-6 w-6">
        <Loader color="#fff" />
      </div>
    </button>
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
    const prefetch = async () => {
      try {
        await import("../../components/product/deleteproductbutton");
      } catch (e) {
        console.log("error prefetching", e);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prefetch();

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

  return (
    <Transition>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="User's current products" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pb-6">
        {query.isLoading && (
          <div
            style={{ width: "screen", height: "calc(100vh - 10.8rem)" }}
            className="flex justify-center items-center"
          >
            <div className="h-10 w-10">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && (
          <>
            {data && data.product ? (
              <>
                <div className="flex xl:flex-row flex-col xl:justify-center xl:items-start gap-6">
                  <section className="flex justify-center items-center md:flex-row flex-col md:gap-2">
                    <div className="md:mb-0 mb-6">
                      <img
                        src={`${apiProtocol}://${apiHost}/${data.product.images[0].url}`}
                        alt={data.product.name}
                        className="md:w-600 w-80 md:h-600 h-300 mx-auto"
                        loading="eager"
                      />
                    </div>
                    <div>
                      {data.product.images.length > 1 ? (
                        <ul className="flex justify-center items-center md:flex-col flex-row gap-4 flex-wrap">
                          {data.product.images.map((image, index) => {
                            if (index === 0) {
                              return null;
                            }
                            return (
                              <li key={image.id}>
                                <ImageComponent
                                  image={image.url}
                                  alt={data.product.name}
                                  idx={index}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                  <section className="xl:w-6/12 md:w-8/12 w-11/12 mx-auto mt-8 pl-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-center text-xl py-4">
                        {data.product.name}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center w-5/12">
                      <span className="text-red-500">
                        {data.product.sellingPrice.toLocaleString("en-US", {
                          currency: "USD",
                          style: "currency",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="line-through">
                        {data.product.buyingPrice.toLocaleString("en-US", {
                          currency: "USD",
                          style: "currency",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center w-6/12 pt-2 pb-2">
                      <p>
                        <span className="font-semibold">
                          {data.product.inventory}
                        </span>{" "}
                        left
                      </p>
                      <p>{formatDate(data.product.createdAt)}</p>
                    </div>
                    <ProductDescription
                      description={data.product.description}
                    />
                    <div className="mt-4 flex justify-start items-center gap-20 mb-8">
                      <Link
                        className="bg-green-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
                        to={`/products/${data.product.id}/edit`}
                        aria-label="Update Product"
                      >
                        Update
                      </Link>
                      <Suspense fallback={<ButtonFallback />}>
                        <DeleteProductButton
                          id={data.product.id}
                          name={data.product.name}
                        />
                      </Suspense>
                    </div>
                    <div>
                      <Suspense fallback={<CommentsFallback />}>
                        <Transition>
                          <CommentList id={data.product.id} />
                        </Transition>
                      </Suspense>
                    </div>
                  </section>
                </div>
              </>
            ) : null}
          </>
        )}
      </main>
    </Transition>
  );
};

export default ProductPage;
