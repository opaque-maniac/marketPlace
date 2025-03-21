import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { fetchCart } from "../../utils/queries/cart/cart";
import EmptyCart from "../../components/cart/emptycart";
import CartList from "../../components/cart/cartlist";
import OrderCart from "../../components/cart/ordercart";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

const Fallback = ({ background }: { background: string }) => {
  return (
    <button
      aria-label="Order cart"
      disabled
      className={`block h-10 w-40 bg-${background}-400 text-white rounded-md`}
    >
      <div className="h-10 w-10 py-1 mx-auto">
        <Loader color="#fff" />
      </div>
    </button>
  );
};

const CartPage = () => {
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const urlParams = new URLSearchParams(window.location.search);

  // When page state changes
  useEffect(() => {
    if (!urlParams.get("page")) {
      navigate("?page=1", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;

  const query = useQuery({
    queryKey: ["cart", page, 10],
    queryFn: fetchCart,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`/cart?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`/cart?page=${newPage}`);
      window.scrollTo(0, 0);
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
      <MetaTags
        title="Cart | Hazina"
        description="Hazina marketplace cart page, view and manage your cart"
        keywords={[
          "cart",
          "view cart",
          "manage cart",
          "cart hazina",
          "hazina cart",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main">
        <div className="flex justify-between item-center md:mx-0 mx-2 pt-4 md:pb-0 pb-4">
          <Suspense fallback={<Fallback background="green" />}>
            <OrderCart
              refetch={refetchCart}
              disable={!data || data?.cartItems.length === 0}
            />
          </Suspense>
          <Suspense fallback={<Fallback background="red" />}>
            <EmptyCart
              refetch={refetchCart}
              disable={!data || data?.cartItems.length === 0}
            />
          </Suspense>
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <div className="h-10 w-10">
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
