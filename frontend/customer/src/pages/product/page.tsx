import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchProduct } from "../../utils/queries/products/fetchindividualproduct";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import TickIcon from "../../components/icons/tick";
import CloseIcon from "../../components/icons/closeIcon";
import TruckIcon from "../../components/icons/truck";
import ArrowPath from "../../components/icons/arrowpath";
import PageLoader from "../../components/pageloader";
import { apiHost, apiProtocol } from "../../utils/generics";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import { calculateDiscount } from "../../utils/price";

const Related = lazy(() => import("./related"));
const CommentList = lazy(() => import("./comments"));
const AddToCart = lazy(() => import("./addtocart"));
const AddToWishlist = lazy(() => import("./addtowishlist"));

const ButtonFallback = ({ background }: { background: string }) => {
  return (
    <button
      disabled
      className={`rounded h-10 w-40 bg-${background}-500 text-white cursor-not-allowed`}
    >
      <div className="h-8 w-8 pt-1 mx-auto py-1">
        <Loader color={"#fff"} />
      </div>
    </button>
  );
};

const Fallback = () => {
  return (
    <div className="h-[400px] w-full flex justify-center items-center">
      <div className="w-10 h-10">
        <Loader color="#000" />
      </div>
    </div>
  );
};

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    import("./addtocart");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    import("./addtowishlist");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchProduct,
    queryKey: ["product", id as string],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  if (query.isSuccess && !query.data?.data) {
    navigate("/404", { replace: true });
  }

  let discount = `0`;
  const product = query.data?.data;

  if (product) {
    discount = calculateDiscount(product.buyingPrice, product.sellingPrice);
  }

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
          <PageLoader />
        ) : (
          <>
            <div className="flex pb-8 xl:flex-row flex-col xl:items-start items-center pt-8 lg:justify-evenly">
              <section className="flex justify-start items-center gap-4 md:flex-row flex-col xl:border-none lg:border lg:border-red-500">
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
                            src={`${apiProtocol}://${apiHost}/${img.url}`}
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

              <section className="xl:w-5/12 lg:w-8/12 md:w-10/12 w-full md:px-0 px-2">
                {product && (
                  <>
                    <div className="flex justify-start items-center gap-6 xl:pt-0 pt-4">
                      <h3 className="text-2xl font-semibold">{product.name}</h3>
                      <div className="min-w-10 h-10 bg-red-500 flex justify-center items-center rounded-tr-md rounded-bl-md shadow-md px-[2px]">
                        <span className="font-bold text-gray-100">
                          {discount}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-10 text-xl py-2">
                      <span className="text-red-400">
                        {product.sellingPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="line-through text-gray-400">
                        {product.buyingPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-start items-center gap-4">
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
                        <span>{product.inventory} left</span>
                      </div>
                    </div>
                    <div className="py-4 flex justify-start items-center gap-4 pl-2">
                      <img
                        src={
                          product.seller.image
                            ? `${apiProtocol}://${apiHost}/${product.seller.image.url}`
                            : "/images/profile.svg"
                        }
                        alt={product.seller.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <Link
                        className="underline text-blue-500"
                        to={`/sellers/${product.sellerID}/products`}
                      >
                        {product.seller.name}
                      </Link>
                    </div>
                    <div>
                      {product.description.length > 200 ? (
                        <>
                          <p>
                            {clicked
                              ? product.description
                              : `${product.description.slice(0, 200)}...`}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setClicked(() => !clicked);
                            }}
                            className="underline text-sm"
                            aria-label="toggle description"
                          >
                            {clicked ? "Less" : "More"}
                          </button>
                        </>
                      ) : (
                        <p className="text-lg">{product.description}</p>
                      )}
                    </div>
                    <div className="flex py-8 md:justify-around items-center justify-center md:flex-row flex-col md:gap-0 gap-4">
                      <Suspense
                        fallback={<ButtonFallback background="green" />}
                      >
                        <AddToCart
                          id={product.id}
                          color="green-500"
                          text="white"
                        />
                      </Suspense>
                      <Suspense
                        fallback={<ButtonFallback background="green" />}
                      >
                        <AddToWishlist id={product.id} />
                      </Suspense>
                    </div>
                  </>
                )}

                <div className="h-180 md:w-399 w-80 mx-auto border border-black rounded-lg">
                  <div
                    style={{ height: "90px" }}
                    className="md:w-399 w-80 border-b border-black flex justify-start items-center gap-4 px-2"
                  >
                    <div className="h-14 w-14">
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
                    <div className="h-14 w-14">
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
            <section
              id="weee"
              className="md:w-8/12 md:pb-0 pb-4 w-11/12 mx-auto rounded min-h-80 mt-8"
            >
              {product && (
                <Suspense fallback={<Fallback />}>
                  <CommentList id={product.id} />{" "}
                </Suspense>
              )}
            </section>
            <section className="min-h-400 w-full xl:px-0 md:px-4">
              <div className="py-4">
                <h3 className="text-xl font-semibold md:text-start text-center">
                  Related Products
                </h3>
              </div>
              {product && (
                <Suspense fallback={<Fallback />}>
                  <Related product={product} />{" "}
                </Suspense>
              )}
            </section>
          </>
        )}
      </main>
    </Transition>
  );
};

export default IndividualProductPage;
