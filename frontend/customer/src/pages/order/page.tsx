import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useCallback } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualOrder } from "../../utils/queries/orders/fetchindividualorder";
import { formatDate } from "../../utils/date";
import PageLoader from "../../components/pageloader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import OrderItems from "./items";
import CancelOrderButton from "../../components/orders/cancelorder";
import PayOrderButton from "../../components/orders/payorder";

const IndividualOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    if (!id) {
      setError(true);
      navigate("/500", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchIndividualOrder,
    queryKey: ["order", id as string],
  });

  const order = query.data?.order;

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
        <title>{`Order ${id ?? ""}`}</title>
        <meta name="description" content={`Page for individual order ${id}`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" style={{ minHeight: "calc(100vh - 1.4rem )" }}>
        {query.isLoading ? (
          <PageLoader />
        ) : (
          <div>
            {order ? (
              <>
                <div className="pt-10 pb-4 border-b border-black w-full">
                  <section className="flex justify-start items-center gap-6 mx-auto md:w-600 w-300">
                    <div className="flex flex-col justify-evenly items-start font-semibold">
                      <p>ID</p>
                      <p>STATUS</p>
                      <p>TOTAL</p>
                      <p>DATE</p>
                    </div>
                    <div className="flex flex-col justify-evenly items-start">
                      <p>: {order.id}</p>
                      <p>: {order.status}</p>
                      <p>: ${`${order.totalAmount}`}</p>
                      <p>: {formatDate(order.createdAt)}</p>
                    </div>
                  </section>
                  <section className="flex md:flex-row flex-col md:gap-0 gap-6 justify-evenly items-center pt-6">
                    <PayOrderButton status={order.status} />
                    <CancelOrderButton
                      id={order.id}
                      refetch={refetch}
                      status={order.status}
                    />
                  </section>
                </div>
                <OrderItems id={order.id} />
              </>
            ) : null}
          </div>
        )}
      </main>
    </Transition>
  );
};

export default IndividualOrderPage;
