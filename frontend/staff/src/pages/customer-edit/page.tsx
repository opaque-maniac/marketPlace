import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, Suspense, lazy } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchCustomer } from "../../utils/queries/customers/fetchcustomer";
import { apiHost, apiProtocol } from "../../utils/generics";
import Loader from "../../components/loader";

const CustomerForm = lazy(() => import("../../components/customer-edit/form"));

const Fallback = () => {
  return (
    <div className="xl:h-[3100px] xl:w-[758px] lg:w-[592px] md:h-[515px] md:w-[473px] h-[492px] w-[344px] flex justify-center items-center mx-auto">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function CustomerEditPage() {
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
      <main role="main">
        <div className="flex justify-center pt-10 pb-4">
          <h3 className="text-xl font-semibold">Edit Customer profile</h3>
        </div>
        {isLoading || !customer ? (
          <PageLoader />
        ) : (
          <div className="h-full w-full flex justify-start xl:justify-center items-center md:items-start xl:flex-row flex-col gap-4 pt-4">
            <section className="xl:w-5/12 w-full">
              {/* Form goes here */}
              <Suspense fallback={<Fallback />}>
                <CustomerForm profile={customer} />
              </Suspense>
            </section>
          </div>
        )}
      </main>
    </Transition>
  );
}
