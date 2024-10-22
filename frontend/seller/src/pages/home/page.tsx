import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchProducts } from "../../utils/queries/products";
import Loader from "../../components/loader";
import ProductsList from "./productslist";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { homePageStore } from "../../utils/pageStore";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const page = homePageStore((state) => state.page);
  const setPage = homePageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?page=${page}`, { replace: true });
  }, [page, navigate]);

  const query = useQuery({
    queryKey: ["products", page, 10],
    queryFn: fetchProducts,
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

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      // navigate(`?page=${newPage}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      setPage(newPage);
      // navigate(`?page=${newPage}`);
    }
  };

  return (
    <Transition>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <section className="h-full">
          {query.isLoading ? (
            <div
              className="flex justify-center items-center"
              style={{
                minHeight: "calc(100vh - 10.8rem)",
              }}
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </div>
          ) : (
            <div className="pt-4">
              <ProductsList products={query.data?.products || []} />
            </div>
          )}
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
      </main>
    </Transition>
  );
};

export default HomePage;
