import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { searchProducts } from "../../utils/queries/products";
import { productsSearchPageStore } from "../../utils/pageStore";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import Transition from "../../components/transition";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import PageLoader from "../../components/pageloader";
import ProductList from "../../components/products/productlist";

const ProductSearchPage = () => {
  const page = productsSearchPageStore((state) => state.page);
  const setPage = productsSearchPageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);
  const location = useLocation();
  const { _query } = useParams();

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);

  // When page mounts
  useEffect(() => {
    setPage(1);
  }, [setPage]);

  useEffect(() => {
    if (!query) {
      navigate("/products", { replace: true });
    }
  }, []);

  // When page state changes
  useEffect(() => {
    navigate(`/products/search/${_query}?page=${page}`, {
      replace: true,
    });
    window.scrollTo(0, 0);
  }, [page, navigate, _query]);

  // When page unmounts
  useEffect(() => {
    return () => {
      if (location.pathname !== "/explore") {
        setPage(1);
      }
    };
  }, [location.pathname, setPage]);

  const query = useQuery({
    queryKey: ["query", page, 20, _query as string],
    queryFn: searchProducts,
  });

  if (query.isError) {
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const [show, url] = errorHandler(error.errorCode);
      if (show) {
        setErr(error.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      // navigate(`?page=${newPage}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      setPage(newPage);
      // navigate(`?page=${newPage}`);
    }
  };

  const data = query.data;

  return (
    <Transition>
      <Helmet>
        <title>{`Search ${_query}`}</title>
        <meta name="description" content={`Search ${_query}`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinksearchbox" />
      </Helmet>
      <main role="main">
        <section>
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div>
              <ProductList products={data?.products || []} />
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

export default ProductSearchPage;
