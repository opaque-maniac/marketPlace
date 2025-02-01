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
import { formatDate } from "../../utils/date";
import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import LocationPinIcon from "../../components/icons/pin";
import StatusForm from "./statusform";

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
                <div className="flex xl:flex-row flex-col xl:justify-evenly justify-center md:items-start items-center md:gap-0 gap-4 w-full">
                  <div>
                    <img
                      src={`http://localhost:3020/${order.product.images[0].url}`}
                      alt={order.product.name}
                      className="h-[400px] w-[350px]"
                    />
                  </div>
                  <div className="md:pl-0 pl-4">
                    <Link target="_blank" to={`/products/${order.productID}`}>
                      <h3 className="text-2xl font-bold xl:no-underline hover:underline underline">
                        {order.product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-start items-center gap-10 mt-2">
                      <div>
                        <p className="font-semibold">{order.status}</p>
                      </div>
                      <div>
                        <p>
                          {order.totalAmount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>{formatDate(order.createdAt)}</p>
                    </div>

                    {/* */}
                    <h3 className="text-lg font-bold mt-4">Customer</h3>
                    <div>
                      <p>
                        {order.customer.firstName} {order.customer.lastName}
                      </p>

                      <div className="flex justify-start items-center gap-2 pt-2">
                        <div className="h-7 w-7 text-white bg-black rounded-full p-1">
                          <EmailIcon />
                        </div>
                        <p>{order.customer.email}</p>
                      </div>
                      <div className="flex justify-start items-center gap-2 pt-2">
                        <div className="h-7 w-7 text-white bg-black rounded-full p-1">
                          <PhoneIcon />
                        </div>
                        <p>{order.customer.phone ?? "Not provided"}</p>
                      </div>
                      <div className="flex justify-start items-center gap-2 pt-2">
                        <div className="h-7 w-7 text-white bg-black rounded-full p-1">
                          <LocationPinIcon />
                        </div>
                        <p>{order.customer.address ?? "Not provided"}</p>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="pt-4">
                      <p className="text-sm font-semibold underline">
                        All payments should be made on delivery as per the{" "}
                        <Link to={"/terms"}>terms & conditions</Link>
                      </p>
                    </div>

                    {/* Status form */}
                    <div className="mt-4 md:pb-0 pb-20">
                      <div className="pb-2">
                        <h3 className="text-lg font-semibold">Update Status</h3>
                      </div>
                      <StatusForm
                        orderID={order.id}
                        initialStatus={order.status}
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
