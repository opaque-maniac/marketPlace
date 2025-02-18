import { errorHandler } from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSeller } from "../../utils/queries/sellers/fetchseller";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import SellersLayout from "../../components/sellers/layout";
import Loader from "../../components/loader";
import MetaTags from "../../components/metacomponent";
import { apiHost, apiProtocol } from "../../utils/generics";

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
        title={seller ? `Seller ${seller.name}` : "Seller | Hazina"}
        description={
          seller ? `Seller ${seller.name}` : "Individual seller page"
        }
        keywords={[
          `${seller ? `Seller ${seller.name}` : "seller"}`,
          "individual seller",
          "seller page",
          "individual seller page",
        ]}
        image={
          seller?.image
            ? `${apiProtocol}://${apiHost}/${seller.image.url}`
            : "/images/logo.svg"
        }
        allowBots={true}
      />
      <div>
        {isLoading ? (
          <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="w-10 h-10">
              <Loader color="#fff" />
            </div>
          </div>
        ) : (
          <div>
            {seller && (
              <>
                <SellersLayout seller={seller} />{" "}
                <section
                  className={`min-h-[200px] ${
                    !seller.bio ? "flex justify-center items-center" : "pl-2"
                  }`}
                >
                  {seller.bio ? (
                    <p>{seller.bio}</p>
                  ) : (
                    <p className="text-xl font-semibold">No bio found</p>
                  )}
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </Transition>
  );
};

export default SellerPage;
