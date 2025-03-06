import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { fetchOrders } from "../../utils/queries/orders/fetchorders";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import OrderItem from "../../components/order";

const Fallback = ({ url }: { url: string }) => {
  return (
    <Link
      to={url}
      className="w-[350px] h-[200px] flex justify-center items-center border border-black"
    >
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

const OrdersPage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);

  const _page = urlParams.get("page");
  const _query = urlParams.get("query");
  const _status = urlParams.get("status");

  useEffect(() => {
    ManageQueryStr(navigate, _page, _query, _status, "status");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";
  const status = _status || "";

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

  const orders = query.data?.orders || [];

  return (
    <Transition>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full md:pt-20 pt-12 relative pb-6">
        <p className="absolute top-4 left-4">
          Home / <span className="font-semibold">Orders</span>
        </p>
        <div className="md:absolute md:mx-0 mx-auto top-2 right-4 flex md:justify-between justify-center md:flex-row flex-col items-center md:gap-0 gap-4 xl:pr-0 pr-4 pb-4">
          <form>
            <div>
              <label htmlFor="delivered" className="sr-only">
                Delivered
              </label>
              <select
                name="delivered"
                id="delivered"
                value={status}
                onBlur={(e) =>
                  navigate(
                    `?page=1&query=${queryStr}&status=${e.currentTarget.value}`,
                  )
                }
                onChange={(e) =>
                  navigate(
                    `?page=1&query=${queryStr}&status=${e.currentTarget.value}`,
                  )
                }
                className="border border-black rounded p-2 block w-40"
              >
                <option value={""}>All</option>
                <option value={"PENDING"}>PENDING</option>
                <option value={"PROCESSING"}>PROCESSING</option>
                <option value={"SHIPPED"}>SHIPPED</option>
                <option value={"READY"}>READY</option>
                <option value={"DELIVERED"}>DELIVERED</option>
                <option value={"CANCELLED"}>DELIVERED</option>
              </select>
            </div>
          </form>
        </div>
        <section className="h-full pt-4">
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
              <section
                style={{
                  minHeight: "calc(100vh - 10.8rem)",
                }}
              >
                {orders.length > 0 ? (
                  <ul className="grid xl:grid-cols-2 grid-cols-1">
                    {orders.map((order) => (
                      <li key={order.id} className="mx-auto pb-6">
                        <Suspense
                          fallback={<Fallback url={`/orders/${order.id}`} />}
                        >
                          <Transition>
                            <OrderItem order={order} />
                          </Transition>
                        </Suspense>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    className="flex justify-center items-center"
                    style={{
                      minHeight: "calc(100vh - 10.8rem)",
                    }}
                  >
                    <h1 className="text-xl font-semibold">
                      No orders available
                    </h1>
                  </div>
                )}
              </section>
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
