import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { apiHost, apiProtocol } from "../../utils/generics";
import { fetchSeller } from "../../utils/queries/sellers/fetchseller";
import TickIcon from "../../components/icons/tick";
import CloseIcon from "../../components/icons/closeIcon";
import { formatDate } from "../../utils/date";
import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import LocationPinIcon from "../../components/icons/pin";
import NotAllowedIcon from "../../components/icons/notallowed";
import CardIcon from "../../components/icons/card";
import PenIcon from "../../components/icons/pen";
import Loader from "../../components/loader";

const SellerProducts = lazy(
  () => import("../../components/seller/sellerproducts"),
);

const Fallback = () => {
  return (
    <div className="xl:h-[235px] lg:h-[600px] md:h-[300px] h-[300px] md:mb-0 mb-10 flex justify-center items-center">
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function SellerPage() {
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
    queryFn: fetchSeller,
    queryKey: ["seller", id as string],
  });

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const seller = data?.seller;

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
      {isLoading || !data ? (
        <PageLoader />
      ) : (
        <main role="main" className="relative pt-12">
          <p className="absolute top-4 left-4">
            Home / <span className="font-bold">Seller Profile</span>
          </p>
          {seller && (
            <>
              <div className="flex justify-start xl:justify-center items-center xl:items-start xl:flex-row flex-col gap-4 pt-4 border-b border-black pb-4">
                <section className="w-[300px] h-[300px] md:w-6/12">
                  <img
                    src={
                      seller.image
                        ? `${apiProtocol}://${apiHost}/${seller.image.url}`
                        : "/images/profile.svg"
                    }
                    alt={seller.name}
                    className="h-full w-full"
                  />
                </section>
                <section className="md:w-5/12">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{seller.name}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-start items-center gap-2">
                      <p className="font-semibold">Active: </p>
                      <div
                        aria-label={seller.active ? "Yes" : "No"}
                        className={`block w-5 h-5 border rounded-full p-[2px] ${
                          seller.active
                            ? "border-green-500 text-green-500"
                            : "border-red-500 text-red-500"
                        }`}
                      >
                        {seller.active ? <TickIcon /> : <CloseIcon />}
                      </div>
                    </div>
                    <p>
                      <span className="font-semibold">Joined: </span>{" "}
                      {formatDate(seller.createdAt)}
                    </p>
                    <p>
                      <span className="font-semibold">Updated: </span>
                      <span>
                        {seller.updatedAt
                          ? formatDate(seller.updatedAt)
                          : formatDate(seller.createdAt)}
                      </span>
                    </p>
                  </div>
                  <div className="flex md:flex-row flex-col md:gap-10 gap-2 my-8">
                    <div>
                      <ul className="flex flex-col gap-2">
                        <li className="flex justify-start items-center gap-2">
                          <a
                            target="_blank"
                            href={`mailto:${seller.email}`}
                            rel="noreferrer"
                            className="block w-7 h-7 bg-black rounded p-[2px]"
                          >
                            <EmailIcon />
                          </a>
                          <p>{seller.email}</p>{" "}
                        </li>
                        <li className="flex justify-start items-center gap-2">
                          {seller.phone ? (
                            <a
                              target="_blank"
                              href={`mailto:${seller.phone}`}
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
                          <p>{seller.phone ?? "Not provided"}</p>{" "}
                        </li>
                        <li className="flex justify-start items-center gap-2">
                          <div className="block w-7 h-7 bg-black text-white rounded p-[2px]">
                            <LocationPinIcon />
                          </div>
                          <p>{seller.phone ?? "Not provided"}</p>{" "}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="flex flex-col gap-2">
                        <li className="flex justify-start items-center gap-2">
                          <Link
                            to={`/sellers/${seller.id}/orders`}
                            className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                          >
                            <CardIcon />
                          </Link>
                          <p>Orders</p>{" "}
                        </li>
                        <li className="flex justify-start items-center gap-2">
                          <Link
                            to={`/sellers/${seller.id}/misconducts/new`}
                            className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                          >
                            <PenIcon />
                          </Link>
                          <p>New Misconduct</p>{" "}
                        </li>
                        <li className="flex justify-start items-center gap-2">
                          <Link
                            to={`/sellers/${seller.id}/misconducts`}
                            className="block w-7 h-7 bg-black text-white rounded p-[2px]"
                          >
                            <NotAllowedIcon />
                          </Link>
                          <p>Misconducts</p>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col md:justify-start justify-center items-center md:gap-10 gap-6 md:mb-0 mb-14 mt-[15px]">
                    <Link
                      to={`/sellers/${seller.id}/edit`}
                      className="flex justify-center items-center w-40 h-10 bg-green-500 text-white rounded"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to={`/sellers/${seller.id}/disable`}
                      className="flex justify-center items-center w-40 h-10 bg-red-500 text-white rounded"
                    >
                      Disable
                    </Link>
                  </div>
                </section>
              </div>
              <Suspense fallback={<Fallback />}>
                <SellerProducts id={seller.id} name={seller.name} />
              </Suspense>
            </>
          )}
        </main>
      )}
    </Transition>
  );
}
