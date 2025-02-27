import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { fetchProducts } from "../../utils/queries/products/fetchproducts";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";
import MobileSearchForm from "../../components/products/exploremobilesearch";
import Loader from "../../components/loader";

const ProductItem = lazy(() => import("../../components/products/product"));

const Fallback = ({ color }: { color: string }) => {
  return (
    <div className="w-[270px] h-[350px] flex justify-center items-center">
      <div className="w-10 h-10">
        <Loader color={color} />
      </div>
    </div>
  );
};

const ExplorePage = () => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);

  // When page state changes
  useEffect(() => {
    const p = urlParams.get("page");
    const q = urlParams.get("query");

    if (!p && !q) {
      navigate("/explore?page=1&query=", { replace: true });
    } else if (!p) {
      navigate(`/explore?page=1&query=${q}`, { replace: true });
    } else if (!q) {
      navigate(`/explore?page=${p}&query=`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;
  const queryStr = urlParams.get("query") || "";

  const query = useQuery({
    queryKey: ["products", page, 20, queryStr],
    queryFn: fetchProducts,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}&query=${queryStr}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}&query=${queryStr}`);
      window.scrollTo(0, 0);
    }
  };

  const products = query.data?.data || [];

  return (
    <Transition>
      <MetaTags
        title="Explore | Hazina"
        description="Explore and buy products in kenya"
        keywords={[
          "explore",
          "explore products",
          "explore hazina",
          "buy products",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main">
        <section className="md:hidden block px-4 pt-2">
          <MobileSearchForm />
        </section>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {products.length === 0 ? null : (
                <ul className="h-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                  {products.map((product) => (
                    <li key={product.id} className="mx-auto">
                      <Suspense fallback={<Fallback color="#fff" />}>
                        <ProductItem product={product} color="black" />
                      </Suspense>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-4">
          <div>
            <button
              disabled={!query.data || page == 1}
              className="w-8 h-8 p-1 rounded-full border border-black"
              onClick={handlePrev}
            >
              <ArrowLeft />
            </button>
          </div>
          <div>{page}</div>
          <div>
            <button
              disabled={!query.data || query.data?.hasNext === false}
              className="w-8 h-8 p-1 rounded-full border border-black"
              onClick={handleNext}
            >
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default ExplorePage;
