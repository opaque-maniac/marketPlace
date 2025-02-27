import { Suspense, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../icons/arrowleft";
import { useQuery } from "@tanstack/react-query";
import ArrowRight from "../icons/arrowright";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchCustomerOrders } from "../../utils/queries/customers/fetchcustomerorders";
import OrderItem from "./orderitem";

interface Props {
  id: string;
  page: number;
  query: string;
}

const Fallback = () => {
  return (
    <div className="md:w-500 w-350 h-[200px] flex justify-center items-center">
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
    queryFn: fetchCustomerOrders,
    queryKey: ["customer-orders", id, page, 12, query],
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

  const orders = data?.orders || [];

  return (
    <div>
      <section
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className={
          orders.length === 0 || !isLoading
            ? "flex justify-center items-center"
            : ""
        }
      >
        {isLoading ? (
          <div className="w-8 h-8">
            <Loader color="#000" />
          </div>
        ) : orders.length === 0 ? (
          <div className="w-10/12">
            <p className="font-semibold text-lg">No orders found.</p>
          </div>
        ) : (
          <ul className="grid lg:grid-cols-2 grid-cols-1">
            {orders.map((item) => (
              <li key={item.id} className="mx-auto md:mb-8 mb-6">
                <Suspense fallback={<Fallback />}>
                  <OrderItem order={item} />
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
