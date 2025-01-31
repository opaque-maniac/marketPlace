import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { fetchOrder } from "../../utils/queries/orders/fetchindividualorder";
import PageLoader from "../../components/pageloader";
import DeliveredButton from "./deliveredb";
import { errorHandler } from "../../utils/errorHandler";

const IndividualOrderPage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const query = useQuery({
    queryKey: ["order", id as string],
    queryFn: fetchOrder,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const order = query.data?.order;

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
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pt-4">
        {query.isLoading ? (
          <PageLoader />
        ) : (
          <>
            {order && (
              <>
                <div className="flex md:flex-row flex-col md:justify-evenly justify-center md:gap-0 gap-4">
                  <div>
                    <img
                      src={`http://localhost:3020/${order.product.images[0].url}`}
                      alt={order.product.name}
                      loading="lazy"
                      style={{ height: "400px", width: "300px" }}
                      className="md:mx-0 mx-auto"
                    />
                  </div>
                  <div className="md:mx-0 mx-auto">
                    <h3 className="text-2xl font-semibold">
                      {order.product.name}
                    </h3>
                    <div
                      style={{ height: "200px" }}
                      className="flex justify-start gap-6 items-center w-80"
                    >
                      <div className="h-full flex flex-col justify-between font-semibold">
                        <p>CUSTOMER</p>
                        <p>QUANTITY</p>
                        <p>TOTAL</p>
                        <p>DATE</p>
                        <p>READY</p>
                        <p>DELIVERED</p>
                      </div>
                      <div className="h-full flex flex-col justify-center gap-2">
                        <p>
                          :{"  "}
                          {`${order.order.customer.firstName} ${order.order.customer.lastName}`}
                        </p>
                        <p>
                          :{"  "}
                          {order.quantity}
                        </p>
                        <p>
                          :{"  "}$
                          {(order.quantity * order.product.price).toFixed(2)}
                        </p>
                        <p>
                          :{"  "}
                          {formatDate(order.dateCreated)}
                        </p>
                        <p>
                          :{"  "}
                          {order.ready ? "Yes" : "No"}
                        </p>
                        <p>
                          :{"  "}
                          {order.delivered ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    <div className="py-4 flex justify-center items-center">
                      <Link
                        className="text-blue-400 underline"
                        to={`/products/${order.product.id}`}
                      >
                        View Product
                      </Link>
                    </div>
                    <div className="flex justify-center items-center pb-4">
                      <DeliveredButton
                        ready={order.ready}
                        delivered={order.delivered}
                        id={order.id}
                        refetch={refetch}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </Transition>
  );
};

export default IndividualOrderPage;
