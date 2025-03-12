import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import PageSearchForm from "../../components/pagesearchform";
import { fetchCustomerOrders } from "../../utils/queries/customers/fetchcustomerorders";
import Loader from "../../components/loader";
import OrdersStatusForm from "../../components/orders/statusform";
import Pagination from "../../components/pagination";

const OrderItem = lazy(() => import("../../components/orders/orderitem"));

const Fallback = ({ url }: { url: string }) => {
  return (
    <Link
      to={url}
      className="order-item flex justify-evenly items-center border border-black/25 md:w-500 w-350 h-[200px]"
    >
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

const CustomerOrdersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

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
  const query = _query || "";
  const status = _status || "";

  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryFn: fetchCustomerOrders,
    queryKey: ["customer-orders", id as string, page, 10, query, status],
  });

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const orders = data?.orders || [];

  return (
    <Transition>
      <Helmet>
        <title>Customers</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-12 relative pb-4">
        <p className="absolute top-4 left-4">
          <Link
            to={`/customers/${id}`}
            className="xl:no-underline xl:hover:underline underline"
          >
            Customer
          </Link>{" "}
          /{" "}
          <Link to={`/customers/${id}`} className="font-extrabold">
            Orders
          </Link>
        </p>
        <div className="md:flex justify-between items-center md:pb-4 pb-0">
          <div>
            <OrdersStatusForm initial={status} queryStr={query} />
          </div>
          <div className="md:w-64 w-72 md:mt-0 mt-3 md:mx-0 mx-auto md:mb-0 mb-4">
            <PageSearchForm
              placeholder="Search Order"
              other="status"
              otherValue={status}
            />
          </div>
        </div>
        {isLoading ? (
          <section className="flex justify-center items-center page-loader-height">
            <div className="w-10 h-10">
              <Loader color="#000" />
            </div>
          </section>
        ) : (
          <div>
            {/* Orders here */}
            <section
              className={`page-loader-height ${
                orders.length === 0 ? "flex justify-center items-center" : ""
              }`}
            >
              {orders.length === 0 ? (
                <p className="font-semibold text-lg">No orders found</p>
              ) : (
                <ul className="grid xl:grid-cols-2 grid-cols-1">
                  {orders.map((order) => (
                    <li key={order.id} className="mx-auto md:mb-8 mb-6">
                      <Suspense
                        fallback={<Fallback url={`/orders/${order.id}`} />}
                      >
                        <OrderItem order={order} />
                      </Suspense>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section>
              <div className="md:block hidden">
                <Pagination
                  page={page}
                  data={data}
                  setPage={(n) => {
                    navigate(`?page=${n}&query=${query}&status=${status}`);
                  }}
                  to={90}
                />
              </div>
              <div className="md:hidden block ">
                <Pagination
                  page={page}
                  data={data}
                  setPage={(n) => {
                    navigate(`?page=${n}&query=${query}&status=${status}`);
                  }}
                  to={145}
                />
              </div>
            </section>
          </div>
        )}
      </main>
    </Transition>
  );
};

export default CustomerOrdersPage;
