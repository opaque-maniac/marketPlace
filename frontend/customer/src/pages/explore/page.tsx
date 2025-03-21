import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";
import Loader from "../../components/loader";
import FilterComponent from "../../components/products/filtercomponent";
import {
  FilterState,
  initialFilters,
  ProductFilterContext,
} from "../../utils/productContext";
import { fetchExploreProducts } from "../../utils/queries/products/fetchexploreproducts";

const ProductItem = lazy(() => import("../../components/products/product"));

function Fallback({ color, url }: { color: string; url: string }) {
  return (
    <Link
      to={url}
      className="w-[270px] h-[350px] flex justify-center items-center border"
    >
      <div className="w-10 h-10">
        <Loader color={color} />
      </div>
    </Link>
  );
}

function ExplorePage() {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const [filters] = useContext(ProductFilterContext);

  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);

  // When page state changes
  useEffect(() => {
    const p = urlParams.get("page");
    const q = urlParams.get("query");

    if (!p && !q) {
      navigate("?page=1&query=", { replace: true });
    } else if (!p) {
      navigate(`?page=1&query=${q}`, { replace: true });
    } else if (!q) {
      navigate(`?page=${p}&query=`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;
  const queryStr = urlParams.get("query") || "";

  const query = useQuery({
    queryKey: [
      "products",
      page,
      20,
      queryStr,
      filters.minprice.toString(),
      filters.maxprice.toString(),
      true,
      filters.category,
    ],
    queryFn: fetchExploreProducts,
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
        <section>
          <FilterComponent />
        </section>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {products.length === 0 ? (
                <section
                  style={{ height: "calc(100vh - 9.5rem)" }}
                  className="flex justify-center items-center"
                >
                  <p>
                    No products found{queryStr ? ` for search ${queryStr}` : ""}
                  </p>
                </section>
              ) : (
                <div>
                  {query.data?.sellers && (
                    <>
                      {query.data.sellers.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold md:pl-6">
                            Sellers:
                          </h3>
                          <h3 className="text-lg font-semibold md:pl-6">
                            Products:
                          </h3>
                        </div>
                      )}
                    </>
                  )}
                  <ul className="h-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {products.map((product) => (
                      <li key={product.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense
                          fallback={
                            <Fallback
                              url={`/products/${product.id}`}
                              color="#000"
                            />
                          }
                        >
                          <ProductItem
                            border="black"
                            product={product}
                            color="black"
                          />
                        </Suspense>
                      </li>
                    ))}
                  </ul>
                </div>
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
}

export default function ExplorePageWrapper() {
  const state = useState<FilterState>(initialFilters);

  return (
    <ProductFilterContext.Provider value={state}>
      <ExplorePage />
    </ProductFilterContext.Provider>
  );
}
