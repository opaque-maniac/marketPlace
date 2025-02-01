import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products/fetchindividualproduct";
import { lazy, Suspense, useContext, useEffect } from "react";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import { calculateDiscount } from "../../utils/discount";
import ProductDescription from "./description";
import { formatDate } from "../../utils/date";
import TickIcon from "../../components/icons/tick";
import CloseIcon from "../../components/icons/closeIcon";
import ProductImagesComponent from "./images";

const CommentList = lazy(() => import("./comments"));

const CommentFallback = () => {
  return (
    <div className="h-72 w-full flex justify-center items-center">
      <div className="w-10 h-10 mx-auto">
        <Loader color="#000000" />
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

  return (
    <Transition>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="User's current products" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        {query.isLoading && (
          <div className="flex justify-center items-center w-screen h-screen">
            <div className="h-10 w-10">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && (
          <>
            {data && data.product ? (
              <>
                <div className="flex lg:justify-around justify-center lg:items-start items-center lg:flex-row flex-col gap-8">
                  <ProductImagesComponent
                    images={data.product.images}
                    name={data.product.name}
                  />
                  <section className="xl:w-6/12 md:w-9/12 w-11/12 mx-auto pt-4">
                    <div className="flex justify-start items-center gap-10 p-1">
                      <h3 className="font-semibold text-xl">
                        {data.product.name}
                      </h3>
                      <div
                        aria-label={`${calculateDiscount(data.product.buyingPrice, data.product.sellingPrice)} percent discount`}
                        className="w-10 h-10 bg-red-500 text-white rounded-tr-md rounded-bl-md flex justify-center items-center"
                      >
                        <span className="font-semibold">
                          {calculateDiscount(
                            data.product.buyingPrice,
                            data.product.sellingPrice,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-10">
                      <span className="text-red-400">
                        {data.product.sellingPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="line-through">
                        {data.product.buyingPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="mb-1 flex justify-start items-center gap-10">
                        <p>
                          Stock: <span>{data.product.inventory}</span>
                        </p>
                        <div className="flex justify-start items-center gap-2">
                          <div
                            className={`h-5 w-5 text-green-500 border ${
                              data.product.inventory <= 0
                                ? "border-red-500"
                                : "border-green-500"
                            } rounded-full`}
                          >
                            {data.product.inventory <= 0 ? (
                              <CloseIcon />
                            ) : (
                              <TickIcon />
                            )}
                          </div>
                          <p
                            className={
                              data.product.inventory <= 0
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {data.product.inventory <= 0
                              ? "Out of stock"
                              : "In stock"}
                          </p>
                        </div>
                      </div>
                      <p>{formatDate(data.product.createdAt)}</p>
                    </div>
                    <div className="pt-4">
                      <ProductDescription
                        description={data.product.description}
                      />
                    </div>
                    <div className="flex md:justify-start justify-center items-center md:flex-row flex-col md:gap-10 gap-6 pt-4">
                      <Link
                        to={`/products/${data.product.id}/edit`}
                        className="flex justify-center items-center bg-green-400 w-40 h-10 rounded-lg text-white"
                      >
                        <span>Update</span>
                      </Link>
                      <Link
                        to={`/products/${data.product.id}/delete`}
                        className="flex justify-center items-center bg-red-400 w-40 h-10 rounded-lg text-white"
                      >
                        <span>Delete</span>
                      </Link>
                    </div>
                  </section>
                </div>

                <section className="my-8">
                  {data.product ? (
                    <Suspense fallback={<CommentFallback />}>
                      <Transition>
                        <CommentList id={data.product.id} />
                      </Transition>
                    </Suspense>
                  ) : null}
                </section>
              </>
            ) : null}
          </>
        )}
      </main>
    </Transition>
  );
};

export default ProductPage;
