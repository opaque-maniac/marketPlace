import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products";
import { useContext, useEffect, useState } from "react";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import Loader from "../../components/loader";
import CommentList from "./comments";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [show, setShow] = useState<boolean>(false);

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

  const calclulateOriginal = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

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
          <div
            style={{ width: "screen", height: "calc(100vh - 10.8rem)" }}
            className="flex justify-center items-center"
          >
            <div className="h-20 w-20">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && (
          <>
            {data && data.product ? (
              <>
                <div>
                  <section className="flex justify-center items-center md:flex-row flex-col md:gap-6">
                    <div className="md:mb-0 mb-6">
                      <img
                        src={`http://localhost:3020/${data.product.images[0].url}`}
                        alt={data.product.name}
                        className="md:w-600 w-80 md:h-600 h-300 mx-auto"
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
                                <img
                                  src={`http://localhost:3020/${image.url}`}
                                  alt={data.product.name}
                                  className="w-32 h-32"
                                />
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                  <section className="md:w-8/12 w-11/12 mx-auto border shadow-xl rounded-lg mt-8 p-2">
                    <h3 className="font-semibold text-center text-xl py-4">
                      {data.product.name}
                    </h3>
                    <div className="flex justify-center items-center gap-20">
                      <span className="text-red-400">
                        ${data.product.price.toFixed(2)}
                      </span>
                      <span className="line-through">
                        $
                        {calclulateOriginal(
                          data.product.price,
                          data.product.discountPercentage,
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="md:w-10/12 mx-auto w-11/12">
                      <p>
                        {show
                          ? data.product.description
                          : `${data.product.description.slice(0, 100)}...`}
                      </p>
                      <a
                        href="clkdcslcnsls"
                        role="button"
                        aria-label={show ? "Show Less" : "Show More"}
                        className="underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(() => !show);
                        }}
                      >
                        {show ? "Show Less" : "Show More"}
                      </a>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                      <p>
                        Created: <span>{data.product.createdAt}</span>
                      </p>
                      <p>
                        Stock: <span>{data.product.inventory}</span>
                      </p>
                    </div>
                  </section>
                </div>
                <section className="md:w-8/12 w-11/12 mx-auto border shadow-xl rounded-lg mt-8 p-2 flex justify-center items-center md:flex-row flex-col md:gap-14 gap-8">
                  <div>
                    <button
                      className="bg-green-400 w-40 h-10 rounded-lg text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/products/${data.product.id}/edit`);
                      }}
                      aria-label="Update Product"
                    >
                      Update
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-red-400 w-40 h-10 rounded-lg text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/products/${data.product.id}/delete`);
                      }}
                      aria-label="Delete Product"
                    >
                      Delete
                    </button>
                  </div>
                </section>
                <section className="my-8">
                  {data.product ? (
                    <div>
                      <Transition>
                        <CommentList id={data.product.id} />
                      </Transition>
                    </div>
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
