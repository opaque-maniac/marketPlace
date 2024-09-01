import Transition from "../../components/transition";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { searchPageStore } from "../../utils/pageStore";
import ErrorContext, { ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../utils/queries/search";
import Loader from "../../components/loader";
import ProductList from "../../components/productlist";

const SearchPage = () => {
  const page = searchPageStore((state) => state.page);
  const setPage = searchPageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);
  const search = new URLSearchParams(location.search).get("query");
  const category = new URLSearchParams(location.search).get("category");

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    navigate(`/search?page=${page}`, { replace: true });
    return () => {
      setPage(1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, navigate]);

  const query = useQuery({
    queryFn: searchProducts,
    queryKey: ["search", search, category, page, 20],
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

  const data = query.data?.data;
  console.log(data);

  return (
    <Transition>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading && (
            <div
              style={{ minHeight: "calc(100vh - 1.4rem )" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#000" />
              </div>
            </div>
          )}
          {query.isSuccess && data && (
            <ProductList products={data} overflow={false} color="black" />
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-2">
          <div>
            <button
              disabled={!data || page == 1}
              className="w-8 h-8 p-1 rounded-full border border-black"
              onClick={handlePrev}
            >
              <ArrowLeft />
            </button>
          </div>
          <div>{page}</div>
          <div>
            <button
              disabled={!data || query.data?.hasNext === false}
              className="w-8 h-8 p-1 rounded-full border border-black"
              onClick={handleNext}
            >
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default SearchPage;
