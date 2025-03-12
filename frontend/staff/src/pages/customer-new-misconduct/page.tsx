import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchCustomer } from "../../utils/queries/customers/fetchcustomer";
import NewMisconductPageWraper from "../../components/misconductwrapper";
import Loader from "../../components/loader";

const NewMisconductForm = lazy(
  () => import("../../components/new-misconducts/form"),
);

const Fallback = () => {
  return (
    <div className="border md:w-[420px] w-[350px] h-[694px] mx-auto flex justify-center items-center">
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

function CustomerNewMisconductPage() {
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

  const { isLoading, isError, isSuccess, data, error } = useQuery({
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
      {isLoading || !customer ? (
        <PageLoader />
      ) : (
        <main role="main" className="relative pt-12">
          <p className="absolute top-4 left-4">
            Home / <span className="font-bold">New Misconduct</span>
          </p>
          <div className="pt-4 pb-4">
            <h3 className="text-center">
              New Misconduct for customer{" "}
              <span className="font-bold">
                {customer.firstName} {customer.lastName}
              </span>
            </h3>
          </div>
          <Suspense fallback={<Fallback />}>
            <section className="border md:w-[420px] w-[350px] py-4 mx-auto">
              <NewMisconductForm
                email={customer.email}
                id={customer.id}
                type="customer"
              />
            </section>
          </Suspense>
          <div className="flex justify-center pt-4 mb-6">
            <Link to={`/customers/${customer.id}`} className="underline">
              Go back to profile
            </Link>
          </div>
        </main>
      )}
    </Transition>
  );
}

export default function CustomerNewMisconductPageWrapper() {
  return (
    <NewMisconductPageWraper>
      <CustomerNewMisconductPage />
    </NewMisconductPageWraper>
  );
}
