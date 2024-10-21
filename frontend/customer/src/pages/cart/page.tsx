import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { cartPageStore } from "../../utils/pageStore";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { fetchCart } from "../../utils/queries/cart";
import EmptyCart from "../../components/cart/emptycart";
import CartList from "../../components/cart/cartlist";
import OrderCart from "../../components/cart/ordercart";

const CartPage = () => {
  const page = cartPageStore((state) => state.page);
  const setPage = cartPageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const location = useLocation();

  // For pagination
  useEffect(() => {
    setPage(1);
  }, [setPage]);

  // When page state changes
  useEffect(() => {
    navigate(`/cart?page=${page}`, { replace: true });
    window.scrollTo(0, 0);
  }, [page, navigate]);

  // When page unmounts
  useEffect(() => {
    return () => {
      if (location.pathname !== "/explore") {
        setPage(1);
      }
    };
  }, [location.pathname, setPage]);

  const query = useQuery({
    queryKey: ["cart", page, 10],
    queryFn: fetchCart,
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
        } else {
          setErr("An unexpected error occurred.");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

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

  const refetchCart = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  useEffect(() => {
    refetchCart();
  }, [refetchCart]);

  const data = query.data;

  return (
    <Transition>
      <Helmet>
        <title>Cart</title>
        <meta
          name="description"
          content="Cart page for Hazina marketplace app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <div className="flex justify-between item-center pr-4 pt-4">
          <OrderCart
            refetch={refetchCart}
            disable={!data || data?.cartItems.length === 0}
          />
          <EmptyCart
            refetch={refetchCart}
            disable={!data || data?.cartItems.length === 0}
          />
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <div className="h-20 w-20">
                <Loader color="#fff" />
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              <CartList
                cartItems={data ? data.cartItems : []}
                color="black"
                refetch={refetchCart}
              />
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-2">
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

export default CartPage;
