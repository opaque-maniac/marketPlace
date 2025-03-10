import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import NewMisconductForm from "../../components/new-misconducts/form";
import { fetchSeller } from "../../utils/queries/sellers/fetchseller";
import NewMisconductPageWraper from "../../components/misconductwrapper";

function SellerNewMisconductPage() {
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
      {isLoading || !seller ? (
        <PageLoader />
      ) : (
        <main role="main" className="relative pt-12">
          <p className="absolute top-4 left-4">
            Home / <span className="font-bold">New Misconduct</span>
          </p>
          <div className="pt-4 pb-4">
            <h3 className="text-center">
              New Misconduct for seller{" "}
              <span className="font-bold">{seller.name}</span>
            </h3>
          </div>
          <section className="border md:w-[420px] w-[350px] py-4 mx-auto">
            <NewMisconductForm
              email={seller.email}
              id={seller.id}
              type="seller"
            />
          </section>
          <div className="flex justify-center pt-4">
            <Link to={`/sellers/${seller.id}`} className="underline">
              Go back to profile
            </Link>
          </div>
        </main>
      )}
    </Transition>
  );
}

export default function SellerNewMisconductPageWraper() {
  return (
    <NewMisconductPageWraper>
      <SellerNewMisconductPage />
    </NewMisconductPageWraper>
  );
}
