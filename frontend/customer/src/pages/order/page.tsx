import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualOrder } from "../../utils/queries/orders";
import PageLoader from "../../components/pageloader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import OrderItems from "./items";
import CardIcon from "../../components/icons/card";
import CancelIcon from "../../components/icons/cancel";

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
                    </div>
                    <div className="flex flex-col justify-evenly items-start">
                      <p>: {order.id}</p>
                      <p>: {order.status}</p>
                      <p>: {`${order.totalAmount}`}</p>
                    </div>
                  </section>
                  <section className="flex md:flex-row flex-col md:gap-0 gap-6 justify-evenly items-center pt-6">
                    <div>
                      <button
                        aria-label="Pay for order"
                        className="w-40 h-10 rounded-lg flex justify-center items-center gap-4 text-white bg-green-500"
                      >
                        <span className="font-semibold">Pay</span>
                        <div className="h-8 w-8">
                          <CardIcon />
                        </div>
                      </button>
                    </div>
                    <div>
                      <button
                        aria-label="Cancel order"
                        className="w-40 h-10 rounded-lg flex justify-center items-center gap-4 text-white bg-red-500"
                      >
                        <span className="font-semibold">Cancel</span>
                        <div className="h-8 w-8">
                          <CancelIcon />
                        </div>
                      </button>
                    </div>
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
