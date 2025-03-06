import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import PageSearchForm from "../../components/customer-cart/searchform";
import ManageQueryStr from "../../utils/querystr";
import { fetchCustomerOrders } from "../../utils/queries/customers/fetchcustomerorders";
import Loader from "../../components/loader";

const OrderItem = lazy(() => import("../../components/orders/orderitem"));

const Fallback = ({ url }: { url: string }) => {
  return (
    <Link
      to={url}
      className="flex justify-evenly items-center gap-4 border border-black/25 pl-1 md:w-500 w-350 h-[200px]"
    >
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

export default function CustomerOrdersPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    ManageQueryStr(navigate, _page, _query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const query = _page || "";

  const { isLoading, isError, error, data, refetch, isSuccess } = useQuery({
    queryFn: fetchCustomerOrders,
    queryKey: ["customer-orders", id || "", page, 16, query],
  });

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  const refetchCallback = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <main role="main" className="relative pt-12">
        <p className="absolute top-4 left-4">
          Home / <span className="font-bold">Customer's Orders</span>
        </p>
        <div className="w-52 h-12 absolute top-2 right-4">
          <PageSearchForm
            placeholder="Search orders"
            label="Search customer orders"
          />
        </div>
        {isLoading ? (
          <section className="page-loader-height flex justify-center items-center">
            <div className="h-10 w-10">
              <Loader color="#000" />
            </div>
          </section>
        ) : (
          <>
            {orders.length === 0 ? (
              <section className="page-loader-height flex justify-center items-center">
                <p className="text-center">
                  No orders fouond for this customer
                </p>
              </section>
            ) : (
              <section className="page-loader-height">
                <ul className="grid xl:grid-cols-2 grid-cols-1">
                  {orders.map((order) => (
                    <li key={order.id} className="mx-auto md:mb-8 mb-6">
                      <Suspense
                        fallback={<Fallback url={`/orders/${order.id}`} />}
                      >
                        <OrderItem order={order} refetch={refetchCallback} />
                      </Suspense>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </main>
    </Transition>
  );
}
