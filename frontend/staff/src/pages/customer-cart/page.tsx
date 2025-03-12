import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import { fetchCustomerCart } from "../../utils/queries/customers/fetchcustomercart";
import Loader from "../../components/loader";
import PageSearchForm from "../../components/pagesearchform";
import Pagination from "../../components/pagination";

const CartItemComponent = lazy(
  () => import("../../components/customer-cart/cartitem"),
);

const Fallback = () => {
  return (
    <div className="w-[250px] md:h-180 h-[400px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

const CustomerCartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

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
  const query = _query || "";

  const { isLoading, isError, isSuccess, error, data, refetch } = useQuery({
    queryFn: fetchCustomerCart,
    queryKey: ["customer-cart", id || "", page, 12, query],
  });

  if (isError && error) {
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

  const cartItems = data?.cartItems || [];

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
      <main role="main" className="h-full md:pt-16 pt-12 relative pb-4">
        <p className="absolute top-4 left-4">
          {" "}
          <Link
            to={`/customers/${id}`}
            className="xl:no-underline xl:hover:underline underline"
          >
            Customer
          </Link>{" "}
          / <span className="font-extrabold">Cart</span>
        </p>
        <div className="md:absolute top-2 right-4 md:mx-0 mx-auto md:w-60 w-72 md:mb-0 mb-4">
          <PageSearchForm placeholder="Search cart" />
        </div>
        <div>
          <section
            className={`page-loader-height ${
              cartItems.length === 0 || isLoading
                ? "flex justify-center items-center"
                : ""
            }`}
          >
            {isLoading ? (
              <div className="w-8 h-8">
                <Loader color="#000" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="max-w-6/12 h-[30px]">
                <p className="font-semibold text-lg">This cart is empty.</p>
              </div>
            ) : (
              <ul className="grid lg:grid-cols-2 grid-cols-1">
                {cartItems.map((item) => (
                  <li key={item.id} className="mx-auto md:mb-8 mb-6">
                    <Suspense fallback={<Fallback />}>
                      <CartItemComponent
                        cartItem={item}
                        refetch={refetchCallback}
                      />
                    </Suspense>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <div className="md:block hidden">
              <Pagination
                data={data}
                page={page}
                setPage={(n) => {
                  navigate(`?page=${n}&query=${query}`);
                }}
                to={50}
              />
            </div>
            <div className="block md:hidden">
              <Pagination
                data={data}
                page={page}
                setPage={(n) => {
                  navigate(`?page=${n}&query=${query}`);
                }}
                to={90}
              />
            </div>
          </section>
        </div>
      </main>
    </Transition>
  );
};

export default CustomerCartPage;
