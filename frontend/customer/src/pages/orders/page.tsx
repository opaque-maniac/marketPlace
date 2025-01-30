import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { fetchOrders } from "../../utils/queries/orders/fetchorders";
import OrderItem from "../../components/orders/orderitem";
import { errorHandler } from "../../utils/errorHandler";

const OrdersPage = () => {
  const [status, setStatus] = useState<string>("");
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const page = new URLSearchParams(window.location.search).get("page");

  useEffect(() => {
    if (!page) {
      navigate("?page=1", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _page = Number(page) || 1;

  const query = useQuery({
    queryKey: ["orders", _page, 20, status],
    queryFn: fetchOrders,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (_page > 1) {
      const newPage = _page - 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = _page + 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const data = query.data;

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
        <div className="py-2 flex md:flex-row flex-col justify-evenly items-center md:gap-0 gap-4">
          <div>
            <h2 className="text-xl md:text-start text-center font-semibold">
              Orders
            </h2>
          </div>
          <div>
            <select
              aria-label="Filter orders by status"
              onChange={(e) => setStatus(e.target.value)}
              onBlur={(e) => setStatus(e.target.value)}
              value={status}
              className="block w-40 md:h-6 h-8 border border-black/25 focus:border focus:border-black/25"
            >
              <option value="">All</option>
              <option value="PENDING">PENDING</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
              <option value="READY">READY</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div>
              {data && data.orders && data.orders.length > 0 ? (
                <div style={{ minHeight: "calc(100vh - 1.4rem )" }}>
                  <ul className="flex h-full flex-wrap md:flex-row flex-col gap-10 md:pl-10 lg:p-0 justify-evenly items-center">
                    {data.orders.map((order) => (
                      <li key={order.id}>
                        <OrderItem order={order} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="flex justify-center items-center"
                >
                  <div>
                    <h2 className="text-2xl font-semibold">No Orders Found</h2>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-4">
          <div>
            <button
              disabled={!data || _page == 1}
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
