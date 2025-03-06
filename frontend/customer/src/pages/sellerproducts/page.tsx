import { errorHandler } from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSeller } from "../../utils/queries/sellers/fetchseller";
import { lazy, Suspense, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import SellersLayout from "../../components/sellers/layout";
import MetaTags from "../../components/metacomponent";
import { apiHost, apiProtocol } from "../../utils/generics";
import PageLoader from "../../components/pageloader";

const SellerProducts = lazy(
  () => import("../../components/sellers/sellerproducts"),
);

const Fallback = () => {
  return (
    <div className="min-h-[350px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#fff" />
      </div>
    </div>
  );
};

const SellerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isError, error, data } = useQuery({
    queryFn: fetchSeller,
    queryKey: ["seller", id as string],
  });

  if (isError && error) {
    console.log("Layout error\n\n", error);
    errorHandler(error, navigate, setErr, setError);
  }

  const seller = data?.seller;

  return (
    <Transition>
      <MetaTags
        title={
          seller ? `Seller ${seller.name} products` : "Seller Products | Hazina"
        }
        description={
          seller
            ? `Seller ${seller.name} products`
            : "Individual seller products page"
        }
        keywords={[
          `${seller ? `Seller ${seller.name} products` : "seller product"}`,
          "individual seller products",
          "seller products page",
          "individual seller products page",
        ]}
        image={
          seller?.image
            ? `${apiProtocol}://${apiHost}/${seller.image.url}`
            : "/images/logo.svg"
        }
        allowBots={true}
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <main role="main">
          <div>
            <div>
              {seller && (
                <>
                  <SellersLayout seller={seller} />{" "}
                  <Suspense fallback={<Fallback />}>
                    <SellerProducts seller={seller} />
                  </Suspense>
                </>
              )}
            </div>
          </div>
        </main>
      )}
    </Transition>
  );
};

export default SellerPage;
