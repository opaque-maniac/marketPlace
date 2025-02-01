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
import OrderSearchForm from "./searcform";

const OrdersPage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);

  const [status, setStatus] = useState<string>("PEDNING");

  useEffect(() => {
    const _page = urlParams.get("page");
    const _query = urlParams.get("query");

    if (!_page && !_query) {
      navigate(`?page=1&query=`, { replace: true });
    } else if (!_page) {
      navigate(`?page=1&query=${_query}`);
    } else if (!_query) {
      if (!Number.isNaN(_page)) {
        navigate(`?page=1&query=`, { replace: true });
      }
      navigate(`?page=${_page}&query=`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;
  const queryStr = String(urlParams.get("query")) || "";

  const query = useQuery({
    queryKey: ["orders", page, 10, status, queryStr],
    queryFn: fetchOrders,
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
          <div className="flex md:justify-between justify-center md:flex-row flex-col items-center md:gap-0 gap-4 xl:pr-0 pr-4 pb-4">
            <form>
              <div>
                <label htmlFor="delivered" className="sr-only">
                  Delivered
                </label>
                <select
                  name="delivered"
                  id="delivered"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-black rounded p-2 block w-40"
                  onBlur={(e) => setStatus(e.target.value)}
                >
                  <option value={"PENDING"}>PENDING</option>
                  <option value={"PROCESSING"}>PROCESSING</option>
                  <option value={"SHIPPED"}>SHIPPED</option>
                  <option value={"READY"}>READY</option>
                  <option value={"DELIVERED"}>DELIVERED</option>
                  <option value={"CANCELLED"}>DELIVERED</option>
                </select>
              </div>
            </form>
            <div>
              <OrderSearchForm />
            </div>
          </div>
          {query.isLoading ? (
            <div
              className="flex justify-center items-center"
              style={{
                minHeight: "calc(100vh - 9rem)",
              }}
            >
              <div className="h-10 w-10">
                <Loader color="#000000" />
              </div>
            </div>
          ) : (
            <div
              style={{
                minHeight: "calc(100vh - 9rem)",
              }}
            >
              <OrdersList orders={query.data?.orders || []} />
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

export default OrdersPage;
