import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { fetchProducts } from "../../utils/queries/products/fetchproducts";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import Loader from "../../components/loader";

const ProductItem = lazy(() => import("../../components/products/product"));

const Fallback = ({ url }: { url: string }) => {
  return (
    <Link
      to={url}
      className="h-[350px] w-[270px] flex justify-center items-center"
    >
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

const ProductsPage = () => {
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");

  useEffect(() => {
    ManageQueryStr(navigate, _page, _query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";

  const query = useQuery({
    queryKey: ["products", page, 16, queryStr],
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

  const products = query.data?.products || [];

  return (
    <Transition>
      <Helmet>
        <title>Products</title>
        <meta
          name="description"
          content="Products page for Hazina seller app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pt-12 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Products</span>
        </p>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              <div>
                {products.length === 0 ? (
                  <section className="w-full flex justify-center items-center md:min-h-[600px] min-h-[400px]">
                    <div>
                      <p className="text-xl font-semibold">
                        No Products Found {_query ? `For ${_query}` : null}
                      </p>
                    </div>
                  </section>
                ) : (
                  <ul
                    style={{ minHeight: "calc(100vh - 1.4rem)" }}
                    className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 pt-2"
                  >
                    {products.map((product) => (
                      <li key={product.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense
                          fallback={
                            <Fallback url={`/products/${product.id}`} />
                          }
                        >
                          <ProductItem product={product} />
                        </Suspense>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
              disabled={!query.data || !query.data?.hasNext}
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

export default ProductsPage;
