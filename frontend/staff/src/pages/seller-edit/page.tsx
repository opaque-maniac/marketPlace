import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { apiHost, apiProtocol } from "../../utils/generics";
import { fetchSeller } from "../../utils/queries/sellers/fetchseller";

export default function SellerEditPage() {
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
        <title>Seller</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        {isLoading || !seller ? (
          <PageLoader />
        ) : (
          <div className="h-full w-full flex justify-start xl:justify-center items-center md:items-start xl:flex-row flex-col gap-4 pt-4">
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
            <section className="md:w-5/12">{/* Form comes here */}</section>
          </div>
        )}
      </main>
    </Transition>
  );
}
