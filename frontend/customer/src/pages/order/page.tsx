import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import Loader from "../../components/loader";
import ErrorContext, { ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { fetchOrder } from "../../utils/queries/orders";
import OrderButton from "./orderbutton";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryKey: ["order", id as string],
    queryFn: fetchOrder,
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
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const onSuccess = () => {
    setUpdated(() => true);
  };

  const { data } = query;

  return (
    <Transition>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="User's current products" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        {query.isLoading && (
          <div
            style={{ width: "screen", height: "calc(100vh - 10.8rem)" }}
            className="flex justify-center items-center"
          >
            <div className="h-20 w-20">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && (
          <>
            {data && data.order ? (
              <>
                <div>
                  <div>
                    <h1>Order Details</h1>
                    <p>Order ID: {data.order.id}</p>
                    <p>
                      Customer Name: {data.order.order.customer.firstName}{" "}
                      {data.order.order.customer.lastName}
                    </p>
                    <p>Order Date: {data.order.createdAt}</p>
                    <p>Shipping Address: {data.order.order.customer.address}</p>
                    <p>
                      Total Amount:{" "}
                      {(data.order.product.price * data.order.quantity).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <OrderButton
                      onSuccess={onSuccess}
                      id={data.order.id}
                      ready={data.order.ready}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </main>
    </Transition>
  );
};

export default OrderPage;
