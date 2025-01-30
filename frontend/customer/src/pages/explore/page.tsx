import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { fetchProducts } from "../../utils/queries/products/fetchproducts";
import ProductList from "../../components/products/productlist";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";

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

  const data = query.data?.data || [];

  return (
    <Transition>
      <Helmet>
        <title>Explore</title>
        <meta name="description" content="Orders page for Hazina seller app" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {data && (
                <ProductList
                  products={data}
                  color="black"
                  overflow={false}
                  full={true}
                />
              )}
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-4">
          <div>
            <button
              disabled={!data || page == 1}
              className="w-8 h-8 p-1 rounded-full border border-black"
              onClick={handlePrev}
            >
              <ArrowLeft />
            </button>
          </div>
          <div>{page}</div>
          <div>
            <button
              disabled={!data || query.data?.hasNext === false}
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
