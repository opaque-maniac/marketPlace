import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products";
import { useContext, useEffect, useState } from "react";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import ShowError from "../../components/showErr";
import Loader from "../../components/loader";
import CommentList from "./comments";
import ErrorContext from "../../utils/errorContext";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
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

  const callback = () => {
    setErr(() => null);
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
        <div className="h-12">
          {err && <ShowError error={err} callback={callback} />}
        </div>
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
                    <h3>{data.product.name}</h3>
                    <div>
                      <span>{data.product.price}</span>
                      <span>{}</span>
                      <span>
                        {data.product.price -
                          (data.product.price *
                            data.product.discountPercentage) /
                            100}
                      </span>
                    </div>
                    <p>{data.product.description}</p>
                    <div>
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
