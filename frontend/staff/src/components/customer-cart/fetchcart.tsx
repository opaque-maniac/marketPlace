import { Suspense, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../icons/arrowleft";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomerCart } from "../../utils/queries/customers/fetchcustomercart";
import ArrowRight from "../icons/arrowright";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";
import CartItemComponent from "./cartitem";

interface Props {
  id: string;
  page: number;
  query: string;
}

const Fallback = () => {
  return (
    <div className="w-[250px] md:h-180 h-[400px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function FetchCart({ id, page, query }: Props) {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isLoading, isError, isSuccess, error, data, refetch } = useQuery({
    queryFn: fetchCustomerCart,
    queryKey: ["customer-cart", id, page, 12, query],
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
  console.log(data);

  return (
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
  );
}
