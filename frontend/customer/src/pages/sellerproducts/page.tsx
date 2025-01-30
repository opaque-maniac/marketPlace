import { errorHandler } from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSeller } from "../../utils/queries/sellers/fetchseller";
import { lazy, Suspense, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import SellersLayout from "../seller/layout";

const SellerProducts = lazy(() => import("./sellerproducts"));

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
                <Suspense fallback={<Fallback />}>
                  <SellerProducts seller={seller} />
                </Suspense>
              </>
            )}
          </div>
        )}
      </div>
    </Transition>
  );
};

export default SellerPage;
