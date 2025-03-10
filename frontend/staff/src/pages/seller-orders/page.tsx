import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import ManageQueryStr from "../../utils/querystr";
import OrdersStatusForm from "../../components/orders/statusform";
import { fetchSellerOrders } from "../../utils/queries/sellers/fetchorders";
import Transition from "../../components/transition";
import SellerOrdersSearchForm from "../../components/seller-orders/searchform";
import Pagination from "../../components/pagination";
import PageSearchForm from "../../components/pagesearchform";

const OrderItem = lazy(() => import("../../components/orders/orderitem"));

const Fallback = () => {
  return (
    <div className="md:h-[200px] w-350 flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function SellerOrdersPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");
  const _status = params.get("status");

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    ManageQueryStr(navigate, _page, _query, _status, "status");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";
  const status = _status || "";

  const query = useQuery({
    queryFn: fetchSellerOrders,
    queryKey: ["seller-orders", id || "", page, 10, queryStr, status],
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

  const data = query.data;
  const orders = data?.orders || [];

  return (
    <Transition>
      <Helmet>
        <title>Orders</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pt-12 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Orders</span>
        </p>
        <div className="flex md:justify-between justify-start items-center md:flex-row flex-col md:gap-0 gap-6 mb-2 xl:px-0 md:px-4 px-0">
          <OrdersStatusForm initial={status} queryStr={queryStr} />
          <div className="w-60">
            <PageSearchForm
              placeholder="Search orders"
              other="status"
              otherValue={status}
            />
          </div>
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <section className="page-loader-height flex justify-center items-center">
              <div className="h-10 w-10">
                <Loader color="#000" />
              </div>
            </section>
          ) : (
            <div className="page-loader-height w-full">
              {orders.length === 0 ? (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full flex justify-center items-center"
                >
                  <div>
                    <p className="text-xl font-semibold text-center">
                      No Orders Found {queryStr && `For ${queryStr}`}
                      {status && `With Status ${status}`}
                    </p>
                  </div>
                </section>
              ) : (
                <section className="page-loader-height">
                  <ul className="grid xl:grid-cols-2 grid-cols-1">
                    {orders.map((order) => (
                      <li key={order.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense fallback={<Fallback />}>
                          <OrderItem order={order} />
                        </Suspense>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 xl:mb-0 md:mb-9 mb-8">
          <div className="md:block hidden">
            <Pagination
              page={page}
              data={data}
              setPage={(n) => {
                navigate(`?page=${n}&query=${queryStr}&status=${status}`);
              }}
              to={90}
            />
          </div>
          <div className="md:hidden block">
            <Pagination
              page={page}
              data={data}
              setPage={(n) => {
                navigate(`?page=${n}&query=${queryStr}&status=${status}`);
              }}
              to={160}
            />
          </div>
        </section>
      </main>
    </Transition>
  );
}
