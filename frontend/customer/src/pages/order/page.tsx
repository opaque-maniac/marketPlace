import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useCallback, lazy, Suspense } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualOrder } from "../../utils/queries/orders/fetchindividualorder";
import { formatDate } from "../../utils/date";
import PageLoader from "../../components/pageloader";
import { apiHost, apiProtocol } from "../../utils/generics";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import MetaTags from "../../components/metacomponent";

const CancelOrderButtonComponent = lazy(
  () => import("../../components/orders/cancelorderbutton"),
);

const Fallback = () => {
  return (
    <div>
      <button
        aria-label="Go back to order"
        className="rounded flex justify-center items-center text-white bg-red-500 py-2 w-40 h-10"
        disabled
      >
        <Loader color="#fff" />
      </button>
    </div>
  );
};

const IndividualOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    if (!id) {
      setError(true);
      navigate("/500", { replace: true });
      return;
    }

    const prefetch = async () => {
      try {
        await import("../../components/orders/cancelorderbutton");
      } catch (e) {
        console.log("Error prefetching", e);
        setError(true);
        navigate("/500", { replace: true });
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prefetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchIndividualOrder,
    queryKey: ["order", id as string],
  });

  const order = query.data?.order;

  if (query.isError) {
    const { error } = query;
    errorHandler(error, navigate, setErr, setError);
  }

  if (query.isSuccess && !order) {
    setError(true);
    navigate("/500", { replace: true });
  }

  const refetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  return (
    <Transition>
      <MetaTags
        title="Order | Hazina"
        description="View your order"
        keywords={[
          "order",
          "view order",
          "view my order",
          "individual order",
          `order ${id}`,
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" style={{ minHeight: "calc(100vh - 1.4rem )" }}>
        {query.isLoading ? (
          <PageLoader />
        ) : (
          <div>
            {order ? (
              <>
                <div className="w-full flex md:justify-evenly justify-center md:items-start items-center gap-6 md:flex-row flex-col flex-wrap md:min-h-[600px] pt-4">
                  <section>
                    <img
                      src={`${apiProtocol}://${apiHost}/${order.product.images[0].url}`}
                      alt={order.product.name}
                      className="md:h-[500px] h-[450px] md:w-[450px] w-[350px]"
                    />
                  </section>
                  <section className="md:w-5/12">
                    <div className="flex justify-start items-center gap-[50px] pb-6">
                      <Link
                        target="_blank"
                        className="lg:no-underline lg:hover:underline underline"
                        to={`/products/${order.product.id}`}
                      >
                        <h3 className="font-semibold text-start text-xl">
                          {order.product.name}
                        </h3>
                      </Link>
                    </div>

                    <div>
                      <p>
                        Date:{" "}
                        <span className="text-sm font-semibold">
                          {formatDate(order.createdAt)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Quantity: <span>{order.quantity}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Total:{" "}
                        <span>
                          {order.totalAmount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        Status: <span>{order.status}</span>
                      </p>
                    </div>
                    <div className="pb-4">
                      <div className="pb-4">
                        <h3>Seller:</h3>
                      </div>
                      <Link
                        to={`/sellers/${order.sellerID}/products`}
                        className="lg:no-underline underline lg:hover:underline flex justify-start items-center gap-4"
                        target="_blank"
                      >
                        <div>
                          <img
                            className="w-[40px] h-[40px] border rounded-full"
                            src="/images/profile.svg"
                            alt={""}
                          />
                        </div>
                        <div>{order.seller.name}</div>
                      </Link>
                    </div>
                    <section className="flex md:flex-row flex-col md:justify-start justify-center items-center md:gap-8 gap-6 pt-4 text-lg md:pb-0 pb-4">
                      <div>
                        <Link
                          to={`/orders/${order.id}/pay`}
                          className="flex justify-center items-center w-40 h-10 text-white bg-blue-500 rounded"
                        >
                          <span>Pay</span>
                        </Link>
                      </div>
                      <Suspense fallback={<Fallback />}>
                        <CancelOrderButtonComponent
                          orderID={order.id}
                          refetch={refetch}
                        />
                      </Suspense>
                    </section>
                  </section>
                </div>
              </>
            ) : null}
          </div>
        )}
      </main>
    </Transition>
  );
};

export default IndividualOrderPage;
