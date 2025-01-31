import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import OrdersList from "./orderlist";
import { fetchOrders } from "../../utils/queries/orders/fetchorders";
import { errorHandler } from "../../utils/errorHandler";

const OrdersPage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();
  const [ready, setReady] = useState<string>("all");
  const [delivered, setDelivered] = useState<string>("all");
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (!urlParams.get("page")) {
      navigate(`?page=1`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;

  const query = useQuery({
    queryKey: ["orders", page, 10, ready, delivered],
    queryFn: fetchOrders,
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
        <title>Orders</title>
        <meta name="description" content="Orders page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <section className="h-full pt-4">
          <div className="flex md:flex-row flex-col md:justify-evenly items-center md:gap-0 gap-4">
            <div>
              <label className="block" htmlFor="ready">
                Ready
              </label>
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
            <div>
              <label htmlFor="delivered" className="block">
                Delivered
              </label>
              <select
                name="delivered"
                id="delivered"
                aria-label="Filter for whether order is delivered or not"
                value={delivered}
                onChange={(e) => setDelivered(e.target.value)}
                className="border border-black rounded-md p-2"
                onBlur={(e) => setDelivered(e.target.value)}
              >
                <option value="all">All</option>
                <option value="true">Ready</option>
                <option value="false">Not Ready</option>
              </select>
            </div>
          </div>
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
            <OrdersList orders={query.data?.orders || []} />
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

export default OrdersPage;
