import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import { fetchCustomerCart } from "../../utils/queries/customers/fetchcustomercart";
import Loader from "../../components/loader";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import PageSearchForm from "../../components/customer-cart/searchform";

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

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    if (_page === null || Number.isNaN(_page)) {
      navigate("?page=1", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;

  const { isLoading, isError, isSuccess, error, data, refetch } = useQuery({
    queryFn: fetchCustomerCart,
    queryKey: ["customer-cart", id || "", page, 12],
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
    if (data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

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
      <main role="main" className="h-full md:pt-20 pt-12 relative pb-4">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Customer Cart</span>
        </p>
        <div>
          <section
            style={{
              minHeight: "calc(100vh - 150px)",
              paddingTop: "15px",
            }}
            className={`${
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
                disabled={!data || !data?.hasNext}
                className="w-8 h-8 p-1 rounded-full border border-black"
                onClick={handleNext}
              >
                <ArrowRight />
              </button>
            </div>
          </section>
        </div>
      </main>
    </Transition>
  );
};

export default CustomerCartPage;
