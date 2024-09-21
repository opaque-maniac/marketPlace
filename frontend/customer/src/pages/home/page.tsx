import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import TruckIcon from "../../components/icons/truck";
import PhoneIcon from "../../components/icons/phone";
import ShieldIcon from "../../components/icons/shield";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../utils/queries/products";
import ProductList from "../../components/productlist";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import { useContext } from "react";
import ErrorContext, { ShowErrorContext } from "../../utils/errorContext";
import BallIcon from "../../components/icons/ball";
import ElectronicsIcon from "../../components/icons/electronics";
import DressIcon from "../../components/icons/dress";
import SpoonIcon from "../../components/icons/spoon";
import ToyIcon from "../../components/icons/toy";
import BooksIcon from "../../components/icons/books";

const HomePage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchProducts,
    queryKey: ["products", 1, 38],
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

  const data = query.data?.data;

  return (
    <Transition>
      <Helmet>
        <title>Hazina</title>
        <meta
          name="description"
          content="Hazina marketplace home page, explore an buy products in kenya"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="px-2">
        <section className="md:flex justify-start items-center gap-4 mb-32">
          <div className="md:w-5/12 md:h-344 h-52 md:border-r border-black flex justify-center items-center">
            <div>
              <h3 className="font-semibold text-xl md:text-start text-center mb-4">
                Browse Our Categories
              </h3>
              <ul className="flex md:flex-col flex-row flex-wrap justify-center md:items-start items-center md:gap-3 gap-8">
                <li>
                  <Link
                    to={`/categories/ELECTRONICS`}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    ELECTRONICS
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/categories/FASHION`}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    FASHION
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/HOME"}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/BEAUTY"}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    BEAUTY
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/SPORTS"}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    SPORTS
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/FOOD"}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    FOOD
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/BOOKS"}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    BOOKS
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/categories/TOYS"}
                    className="lg:no-underline underline lg:hover:underline"
                  >
                    TOYS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ height: "400px" }} className="w-full py-4">
            <div className="bg-black h-full w-full px-2">
              {query.isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                  <div className="h-20 w-20">
                    <Loader color="#ffffff" />
                  </div>
                </div>
              ) : (
                <>
                  {data && (
                    <ProductList
                      products={data.slice(0, 6)}
                      color="white"
                      overflow={true}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        <section style={{ minHeight: "493px" }}>
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">{`Today's`}</p>
          </div>
          {query.isLoading ? (
            <div
              style={{ height: "calc(493px - 2.7rem)" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </div>
          ) : (
            <div
              style={{ height: "calc(493px - 2.7rem)" }}
              className="w-full px-2"
            >
              {data && (
                <ProductList
                  products={data.slice(6, 12)}
                  color="black"
                  overflow={true}
                />
              )}
            </div>
          )}
        </section>
        <section className="h-32 flex justify-center items-center">
          <button
            aria-label="View all products"
            className="h-14 w-56 roundend-sm bg-red-400 text-white"
          >
            View All Products
          </button>
        </section>
        <hr />
        <section className="pt-4">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">Categories</p>
          </div>
          <h2 className="text-3xl font-semibold">Browser By Category</h2>
          <div className="pt-10 pb-12">
            <ul className="flex lg:justify-between justify-center lg:gap-0 gap-4 items-center flex-wrap">
              <li>
                <div className="w-44 h-36 border border-black/25">
                  <div className="h-24 w-full pt-2">
                    <BallIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-center">
                      SPORTS
                    </h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25">
                  <div className="h-24 w-full pt-2">
                    <DressIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-center">
                      FASHION
                    </h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25">
                  <div className="h-24 w-full pt-2">
                    <ElectronicsIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-center">
                      ELECTRONICS
                    </h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25">
                  <div className="h-24 w-full pt-2">
                    <SpoonIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-center">FOOD</h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25">
                  <div className="h-24 w-full pt-2">
                    <ToyIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-center">TOYS</h3>
                  </div>
                </div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25">
                  <div className="h-24 w-full flex justify-center pt-2">
                    <BooksIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-center">BOOKS</h3>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <hr />
        <section style={{ minHeight: "518px" }} className="mt-4 mb-32">
          {" "}
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">Check these out</p>
          </div>
          <div className="h-20 flex md:justify-between items-center justify-center md:gap-0 gap-6 md:px-8">
            <h2 className="text-3xl font-semibold">Best Selling Products</h2>
            <button
              aria-label="View All Products"
              className="w-40 h-14 rounded-sm bg-red-400 text-white"
            >
              View All
            </button>
          </div>
          {query.isLoading ? (
            <div
              style={{ height: "calc(518px - 7.6rem)" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </div>
          ) : (
            <div
              style={{ minHeight: "calc(518px - 7.6rem)" }}
              className="w-full flex justify-center items-center px-2"
            >
              {data && (
                <ProductList
                  products={data.slice(12, 16)}
                  color="black"
                  overflow={false}
                />
              )}
            </div>
          )}
        </section>
        <section style={{ minHeight: "500px" }} className="bg-black mb-32">
          {query.isLoading ? (
            <div
              style={{ height: "500px" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#ffffff" />
              </div>
            </div>
          ) : (
            <div style={{ height: "500px" }}>
              {data && (
                <ProductList
                  products={data.slice(16, 20)}
                  color="white"
                  overflow={true}
                />
              )}
            </div>
          )}
        </section>
        <section style={{ minHeight: "900px" }}>
          {query.isLoading ? (
            <div
              style={{ height: "900px" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </div>
          ) : (
            <div style={{ height: "900px" }}>
              {data && (
                <ProductList
                  products={data.slice(20, 28)}
                  color="black"
                  overflow={true}
                />
              )}
            </div>
          )}
        </section>
        <section className="h-32 flex justify-center items-center">
          <button
            aria-label="View all products"
            className="h-14 w-56 roundend-sm bg-red-400 text-white"
          >
            View All Products
          </button>
        </section>
        <section style={{ minHeight: "768px" }}>
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">Featured</p>
          </div>
          <div className="flex justify-start items-center py-2">
            <h2 className="text-3xl font-semibold">Other Suggestions</h2>
          </div>
          <div className="md:flex justify-center gap-4 items-center">
            <div
              style={{ height: "720px" }}
              className="bg-black md:w-6/12 w-full"
            >
              {query.isLoading ? (
                <div
                  style={{ height: "720px" }}
                  className="w-full flex justify-center items-center"
                >
                  <div className="h-20 w-20">
                    <Loader color="#ffffff" />
                  </div>
                </div>
              ) : (
                <div style={{ height: "720px" }}>
                  {data && (
                    <ProductList
                      products={data.slice(28, 32)}
                      color="white"
                      overflow={false}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="md:w-6/12">
              <div className="bg-black mb-4 h-350 md:mt-0 mt-4">
                {query.isLoading ? (
                  <div
                    style={{ height: "350px" }}
                    className="w-full flex justify-center items-center"
                  >
                    <div className="h-20 w-20">
                      <Loader color="#ffffff" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-full">
                    {data && (
                      <ProductList
                        products={data.slice(32, 34)}
                        color="white"
                        overflow={false}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="md:flex justify-center items-center gap-4">
                <div className="bg-black h-350 w-full">
                  {query.isLoading ? (
                    <div
                      style={{ height: "350px" }}
                      className="w-full flex justify-center items-center"
                    >
                      <div className="h-20 w-20">
                        <Loader color="#ffffff" />
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: "350px" }}>
                      {data && (
                        <ProductList
                          products={data.slice(34, 38)}
                          color="white"
                          overflow={false}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-80 md:flex justify-center items-center md:py-0 py-10">
          <div className="w-full">
            <ul className="flex md:justify-evenly justify-center md:flex-row flex-col items-center md:gap-0 gap-4">
              <li>
                <div
                  style={{ width: "249px", height: "161px" }}
                  className="flex justify-center items-center flex-col gap-4"
                >
                  <div className="rounded-full bg-gray-500 h-20 w-20 p-2">
                    <div className="rounded-full bg-black h-16 w-16 text-white p-3">
                      <TruckIcon />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>FREE AND FAST DELIVERY</h3>
                    <p>Free delieries for all orders over $140</p>
                  </div>
                </div>
              </li>
              <li>
                <div
                  style={{ width: "249px", height: "161px" }}
                  className="flex justify-center items-center flex-col gap-4"
                >
                  <div className="rounded-full bg-gray-500 h-20 w-20 p-2">
                    <div className="rounded-full bg-black h-16 w-16 text-white p-3">
                      <PhoneIcon />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">
                      24/7 CUSTOMER SERVICE
                    </h3>
                    <p>Friendly 24/7 customer support</p>
                  </div>
                </div>
              </li>
              <li>
                <div
                  style={{ width: "249px", height: "161px" }}
                  className="flex justify-center items-center flex-col gap-4"
                >
                  <div className="rounded-full bg-gray-500 h-20 w-20 p-2">
                    <div className="rounded-full bg-black h-16 w-16 text-white p-3">
                      <ShieldIcon />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">
                      MONEY BACK GUARANTEE
                    </h3>
                    <p>We return money within 30 days</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default HomePage;
