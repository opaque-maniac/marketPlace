import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Suspense, useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchCustomer } from "../../utils/queries/customers/fetchcustomer";
import { apiHost, apiProtocol } from "../../utils/generics";
import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import LocationPinIcon from "../../components/icons/pin";
import { formatDate } from "../../utils/date";
import TickIcon from "../../components/icons/tick";
import CloseIcon from "../../components/icons/closeIcon";
import CartIcon from "../../components/icons/cart";
import CardIcon from "../../components/icons/card";
import HeartIcon from "../../components/icons/heart";
import NotAllowedIcon from "../../components/icons/notallowed";
import PenIcon from "../../components/icons/pen";
import EnableProfileButton from "../../components/enebleprofilebutton";
import Loader from "../../components/loader";

const ButtonFallback = () => {
  return (
    <button
      disabled
      aria-label="loading"
      className="flex justify-center items-center w-40 h-10 bg-blue-500 text-white rounded"
    >
      <div className="w-6 h-6">
        <Loader color="#fff" />
      </div>
    </button>
  );
};

const CustomerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery({
    queryFn: fetchCustomer,
    queryKey: ["customer", id as string],
  });

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const refetchCallback = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customer = data?.customer;

  return (
    <Transition>
      <Helmet>
        <title>Customers</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      {isLoading || !customer ? (
        <PageLoader />
      ) : (
        <main role="main" className="relative pt-12">
          <p className="absolute top-4 left-4">
            Home / <span className="font-bold">Customer Profile</span>
          </p>
          <div className="h-full w-full flex justify-start xl:justify-center items-center xl:items-start xl:flex-row flex-col gap-4 pt-4">
            <section className="w-[300px] h-[300px] md:w-6/12">
              <img
                src={
                  customer.image
                    ? `${apiProtocol}://${apiHost}/${customer.image.url}`
                    : "/images/profile.svg"
                }
                alt={`${customer.firstName} ${customer.lastName}`}
                className="h-full w-full"
              />
            </section>
            <section className="md:w-5/12">
              <div className="mb-2">
                <h3 className="text-lg font-semibold">
                  {customer.firstName} {customer.lastName}
                </h3>
              </div>
              <div className="mb-4">
                <div className="flex justify-start items-center gap-2">
                  <p className="font-semibold">Active: </p>
                  <div
                    aria-label={customer.active ? "Yes" : "No"}
                    className={`block w-5 h-5 border rounded-full p-[2px] ${
                      customer.active
                        ? "border-green-500 text-green-500"
                        : "border-red-500 text-red-500"
                    }`}
                  >
                    {customer.active ? <TickIcon /> : <CloseIcon />}
                  </div>
                </div>
                <p>
                  <span className="font-semibold">Joined: </span>{" "}
                  {formatDate(customer.createdAt)}
                </p>
                <p>
                  <span className="font-semibold">Updated: </span>
                  <span>
                    {customer.updatedAt
                      ? formatDate(customer.updatedAt)
                      : formatDate(customer.createdAt)}
                  </span>
                </p>
              </div>
              <div className="flex md:flex-row flex-col md:gap-10 gap-2 my-8">
                <div>
                  <ul className="flex flex-col gap-2">
                    <li className="flex justify-start items-center gap-2">
                      <a
                        target="_blank"
                        href={`mailto:${customer.email}`}
                        rel="noreferrer"
                        className="block w-7 h-7 bg-black rounded p-[2px]"
                      >
                        <EmailIcon />
                      </a>
                      <p>{customer.email}</p>{" "}
                    </li>
                    <li className="flex justify-start items-center gap-2">
                      {customer.phone ? (
                        <a
                          target="_blank"
                          href={`mailto:${customer.phone}`}
                          rel="noreferrer"
                          className="block w-7 h-7 bg-black rounded p-[2px]"
                        >
                          <PhoneIcon />
                        </a>
                      ) : (
                        <div className="block w-7 h-7 bg-black rounded p-[2px]">
                          <PhoneIcon />
                        </div>
                      )}
                      <p>{customer.phone ?? "Not provided"}</p>{" "}
                    </li>
                    <li className="flex justify-start items-center gap-2">
                      <div className="block w-7 h-7 bg-black text-white rounded p-[2px]">
                        <LocationPinIcon />
                      </div>
                      <p>{customer.phone ?? "Not provided"}</p>{" "}
                    </li>
                    <li className="flex justify-start items-center gap-2">
                      <Link
                        to={`/customers/${customer.id}/misconducts`}
                        className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                      >
                        <NotAllowedIcon />
                      </Link>
                      <p>Misconducts</p>{" "}
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="flex flex-col gap-2">
                    <li className="flex justify-start items-center gap-2">
                      <Link
                        to={`/customers/${customer.id}/cart`}
                        className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                      >
                        <CartIcon />
                      </Link>
                      <p>Cart</p>{" "}
                    </li>
                    <li className="flex justify-start items-center gap-2">
                      <Link
                        to={`/customers/${customer.id}/orders`}
                        className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                      >
                        <CardIcon />
                      </Link>
                      <p>Orders</p>{" "}
                    </li>
                    <li className="flex justify-start items-center gap-2">
                      <Link
                        to={`/customers/${customer.id}/wishlist`}
                        className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                      >
                        <HeartIcon />
                      </Link>
                      <p>Wishlist</p>{" "}
                    </li>
                    <li className="flex justify-start items-center gap-2">
                      <Link
                        to={`/customers/${customer.id}/misconducts/new`}
                        className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                      >
                        <PenIcon />
                      </Link>
                      <p>New Misconduct</p>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex md:flex-row flex-col md:justify-start justify-center items-center md:gap-10 gap-6 md:mb-0 mb-14 mt-[15px]">
                <Link
                  to={`/customers/${customer.id}/edit`}
                  className="flex justify-center items-center w-40 h-10 bg-green-500 text-white rounded"
                >
                  Edit Profile
                </Link>
                {customer.active ? (
                  <Link
                    to={`/customers/${customer.id}/disable`}
                    className="flex justify-center items-center w-40 h-10 bg-red-500 text-white rounded"
                  >
                    Disable
                  </Link>
                ) : (
                  <Suspense fallback={<ButtonFallback />}>
                    <EnableProfileButton
                      id={customer.id}
                      type="customer"
                      refetch={refetchCallback}
                    />
                  </Suspense>
                )}
              </div>
            </section>
          </div>
        </main>
      )}
    </Transition>
  );
};

export default CustomerPage;
