import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { explorePageStore } from "../../utils/pageStore";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { fetchOrders } from "../../utils/queries/orders";

const OrdersPage = () => {
  const page = explorePageStore((state) => state.page);
  const setPage = explorePageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);
  const location = useLocation();

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);

  // When page mounts
  useEffect(() => {
    setPage(1);
  }, [setPage]);

  // When page state changes
  useEffect(() => {
    navigate(`/orders?page=${page}`, { replace: true });
    window.scrollTo(0, 0);
  }, [page, navigate]);

  // When page unmounts
  useEffect(() => {
    return () => {
      if (location.pathname !== "/explore") {
        setPage(1);
      }
    };
  }, [location.pathname, setPage]);

  const query = useQuery({
    queryKey: ["orders", page, 20],
    queryFn: fetchOrders,
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

  const data = query.data;
  console.log(data);

  return (
    <Transition>
      <Helmet>
        <title>Explore</title>
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
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              <p>Fetched orders</p>
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-4">
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

export default OrdersPage;
