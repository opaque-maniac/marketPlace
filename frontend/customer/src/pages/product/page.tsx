import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchProduct } from "../../utils/queries/products";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ErrorContext, { ShowErrorContext } from "../../utils/errorContext";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import Loader from "../../components/loader";
import { Helmet } from "react-helmet";
import TickIcon from "../../components/icons/tick";
import CloseIcon from "../../components/icons/closeIcon";
import AddToCart from "./addtocart";
import AddToWishlist from "./addtowishlist";
import TruckIcon from "../../components/icons/truck";
import ArrowPath from "../../components/icons/arrowpath";
import Related from "./related";
import CommentList from "./comments";

const IndividualProductPage = () => {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const [clicked, setClicked] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/500", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchProduct,
    queryKey: ["product", id as string],
  });

  const calculateOriginalPrice = (
    price: number,
    discountPercentage: number,
  ): number => {
    const discountAmount = price * (discountPercentage / 100);
    const originalPrice = price + discountAmount;
    return originalPrice;
  };

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

  if (query.isSuccess && !query.data?.data) {
    navigate("/404", { replace: true });
  }

  const product = query.data?.data;
  console.log(product);

  return (
    <Transition>
      <Helmet>
        <title>{product ? product.name : "Product"}</title>
        <meta
          name="description"
          content={product ? product.description : "Product description"}
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinksearchbox" />
      </Helmet>
      <main role="main" className="h-full w-full">
        {query.isLoading ? (
          <section
            style={{ height: "calc(100vh - 1.4rem)" }}
            className="w-full flex justify-center items-center"
          >
            <div className="w-20 h-20">
              <Loader color="#000000" />
            </div>
          </section>
        ) : (
          <>
            <div className="flex pb-8 lg:flex-row flex-col items-center pt-8 md:justify-around">
              <section className="flex justify-start items-center gap-4 md:flex-row flex-col">
                {product && product.images.length > 1 && (
                  <div className="flex md:flex-col flex-row flex-wrap gap-4 justify-center items-center md:order-1 order-2">
                    {product &&
                      product.images.map((img, index) => {
                        if (index === 0) {
                          return;
                        }
                        return (
                          <img
                            key={index}
                            src={`http://localhost:3020/${img.url}`}
                            alt={product.name}
                            className="border w-170 h-138"
                          />
                        );
                      })}
                  </div>
                )}
                <div className="md:order-2 order-1">
                  <img
                    src={`http://localhost:3020/${product ? product.images[0].url : ""}`}
                    alt={product ? product.name : "Product Image"}
                    className="border md:h-600 h-500 md:w-500 w-350"
                  />
                </div>
              </section>

              <section className="md:w-5/12 w-full md:px-0 px-2">
                {product && (
                  <>
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                    <div className="flex justify-start items-center gap-10 text-xl">
                      <span className="text-red-400">
                        ${product.price.toFixed(3)}
                      </span>
                      <span className="line-through text-gray-400">
                        $
                        {calculateOriginalPrice(
                          product.price,
                          product.discountPercentage,
                        ).toFixed(3)}
                      </span>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                      <span
                        className={
                          product.inventory > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {product.inventory > 0 ? "In Stock" : "Out Of Stock"}
                      </span>{" "}
                      <span
                        className={`block h-4 w-4 border rounded-full ${product.inventory > 0 ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}`}
                      >
                        {product.inventory > 0 ? <TickIcon /> : <CloseIcon />}
                      </span>
                    </div>
                    <div>
                      {product.description.length > 100 ? (
                        <>
                          <p>
                            {clicked
                              ? product.description
                              : `${product.description.slice(0, 100)}...`}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setClicked(() => !clicked);
                            }}
                            className="underline"
                          >
                            {clicked ? "Read Less" : "Read More"}
                          </button>
                        </>
                      ) : (
                        <p className="text-lg">{product.description}</p>
                      )}
                    </div>
                    <div className="flex py-8 md:justify-around items-center justify-center md:flex-row flex-col md:gap-0 gap-4">
                      <AddToCart
                        id={product.id}
                        color="green-500"
                        text="white"
                      />
                      <AddToWishlist id={product.id} />
                    </div>
                  </>
                )}

                <div className="h-180 md:w-399 w-80 mx-auto border border-black rounded-lg">
                  <div
                    style={{ height: "90px" }}
                    className="md:w-399 w-80 border-b border-black flex justify-start items-center gap-4 px-2"
                  >
                    <div className="h-16 w-16">
                      <TruckIcon />
                    </div>
                    <div>
                      <h3>Free Delivery</h3>
                      <p className="underline">
                        Enter your postal code for Delivery Availability
                      </p>
                    </div>
                  </div>
                  <div className="md:w-399 w-80 flex justify-start items-center gap-4 px-2">
                    <div className="h-16 w-16">
                      <ArrowPath />
                    </div>
                    <div>
                      <h3>Return Delivery</h3>
                      <p className="underline">Free 30 Days Delivery Return</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section className="md:w-8/12 w-11/12 mx-auto rounded h-80 border mt-8">
              {product && <CommentList id={product.id} />}
            </section>
            <section className="min-h-400 w-full px-2">
              <div className="py-4">
                <h3 className="text-xl font-semibold">Related Products</h3>
              </div>
              {product && <Related product={product} />}
            </section>
          </>
        )}
      </main>
    </Transition>
  );
};

export default IndividualProductPage;
