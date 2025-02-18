import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualOrder } from "../../utils/queries/orders/fetchindividualorder";
import PageLoader from "../../components/pageloader";
import { apiHost, apiProtocol } from "../../utils/generics";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

const IndividualOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    if (!id) {
      setError(true);
      navigate("/500", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchIndividualOrder,
    queryKey: ["order", id as string],
  });

  const order = query.data?.order;

  if (query.isError) {
    const { error } = query;
    errorHandler(error, navigate, setErr, setError);
  }

  if (query.isSuccess && !order) {
    setError(true);
    navigate("/500", { replace: true });
  }

  return (
    <Transition>
      <MetaTags
        title="Pay | Hazina"
        description="Pay for your order"
        keywords={[
          "pay",
          "pay for order",
          "pay for product",
          "pay for service",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" style={{ minHeight: "calc(100vh - 1.4rem )" }}>
        {query.isLoading ? (
          <PageLoader />
        ) : (
          <div>
            {order ? (
              <>
                <div className="md:w-8/12 w-full mx-auto">
                  <section>
                    <img
                      src={`${apiProtocol}://${apiHost}/${order.product.images[0].url}`}
                      alt={order.product.name}
                      className="md:h-[500px] h-[450px] md:w-[450px] w-[350px]"
                    />
                    <div className="flex justify-start items-center gap-[50px] pb-6">
                      <Link
                        target="_blank"
                        className="lg:no-underline lg:hover:underline underline"
                        to={`/products/${order.product.id}`}
                      >
                        <h3 className="font-semibold text-start text-xl">
                          {order.product.name}
                        </h3>
                      </Link>
                    </div>
                  </section>
                  <section>{/* load buttons */}</section>
                </div>
              </>
            ) : null}
          </div>
        )}
      </main>
    </Transition>
  );
};

export default IndividualOrderPage;
