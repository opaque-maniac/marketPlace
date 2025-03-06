import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchProducts } from "../../utils/queries/products/fetchproducts";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import ProductItem from "../../components/products/product";
import ManageQueryStr from "../../utils/querystr";
import SearchForm from "../../components/searchform";

const Fallback = () => {
  return (
    <div className="w-[270px] h-[350px] flex justify-center items-center">
      <div className="w-10 h-10">
        <Loader color="#000000" />
      </div>
    </div>
  );
};

const HomePage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const _page = urlParams.get("page");
  const _query = urlParams.get("query");

  useEffect(() => {
    ManageQueryStr(navigate, _page, _query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";

  const query = useQuery({
    queryKey: ["products", page, 16, queryStr],
    queryFn: fetchProducts,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}&query=${queryStr}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}&query=${queryStr}`);
      window.scrollTo(0, 0);
    }
  };

  const products = query.data?.products || [];

  return (
    <Transition>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="md:pt-14 pt-12 relative">
        <p className="absolute top-4 left-4">
          Home / <span className="font-bold">Products</span>
        </p>
        <div className="md:hidden block w-72 h-12 mx-auto">
          <SearchForm />
        </div>
        {query.isLoading ? (
          <div
            className="flex justify-center place-items-center"
            style={{ height: "calc(100vh - 6.5rem)" }}
          >
            <div className="w-10 h-10">
              <Loader color="#000" />
            </div>
          </div>
        ) : (
          <>
            <section className="page-loader-height">
              <div className="pt-4">
                {products.length === 0 ? (
                  <div className="flex justify-center items-center h-screen">
                    <div>
                      <h2 className="text-2xl text-wrap text-center">{`No products have been found!`}</h2>
                    </div>
                  </div>
                ) : (
                  <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {products.map((product) => (
                      <li key={product.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense fallback={<Fallback />}>
                          <ProductItem product={product} />
                        </Suspense>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            <section className="flex justify-center items-center gap-6 py-4">
              <div>
                <button
                  className="h-7 w-7 p-1 border border-black rounded-full"
                  onClick={handlePrev}
                  disabled={page === 1}
                  aria-label="Previous Page"
                >
                  <ArrowLeft />
                </button>
              </div>
              <div>{`Page ${page}`}</div>
              <div>
                <button
                  className="h-7 w-7 p-1 border border-black rounded-full"
                  onClick={handleNext}
                  disabled={!query.data?.hasNext}
                  aria-label="Next Page"
                >
                  <ArrowRight />
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </Transition>
  );
};

export default HomePage;
