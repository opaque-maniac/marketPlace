import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShowError from "../../components/showErr";
import { orderPageStore } from "../../utils/pageStore";
import ErrorContext from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import OrdersList from "./orderlist";
import { fetchOrders } from "../../utils/queries/orders";

const HomePage = () => {
  const page = orderPageStore((state) => state.page);
  const setPage = orderPageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [ready, setReady] = useState<string>("all");

  useEffect(() => {
    navigate(`?page=${page}`, { replace: true });
  }, [page, navigate]);

  const query = useQuery({
    queryKey: ["orders", page, 10, ready],
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

  const callback = () => {
    setErr(() => null);
  };

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
        <title>Orders</title>
        <meta name="description" content="Orders page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <section className="h-full">
          <div className="h-12">
            {err && <ShowError error={err} callback={callback} />}
          </div>
          <div>
            <select
              name="ready"
              id="ready"
              aria-label="Filter for whether order is ready or not"
              value={ready}
              onChange={(e) => setReady(e.target.value)}
              className="border border-black rounded-md p-2"
              onBlur={(e) => setReady(e.target.value)}
            >
              <option value="all">All</option>
              <option value="true">Ready</option>
              <option value="false">Not Ready</option>
            </select>
          </div>
          {query.isLoading && (
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
          )}
          {query.isSuccess && <OrdersList orders={query.data.orders} />}
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
