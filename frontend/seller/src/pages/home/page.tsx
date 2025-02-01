import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchProducts } from "../../utils/queries/products/fetchproducts";
import Loader from "../../components/loader";
import ProductsList from "./productslist";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";

const HomePage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const _page = urlParams.get("page");
    const _query = urlParams.get("query");
    const replace = { replace: true };

    if (!_page && !_query) {
      navigate(`?page=1&query=`, replace);
    } else if (!_page) {
      navigate(`?page=1&query=${_query}`, replace);
    } else if (!_query) {
      if (!Number.isNaN(_page)) {
        navigate(`?page=1&query=${_query}`, replace);
      } else {
        navigate(`?page=1&query=`, replace);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;
  const queryStr = String(urlParams.get("query")) || "";

  const query = useQuery({
    queryKey: ["products", page, 10, queryStr],
    queryFn: fetchProducts,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
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
        <section
          style={{
            minHeight: "calc(100vh - 5.4rem)",
          }}
        >
          {query.isLoading ? (
            <div className="flex justify-center items-center h-screen w-full">
              <div className="h-10 w-10">
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
