import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchProducts } from "../../utils/queries/products";
import Loader from "../../components/loader";
import ProductsList from "./productslist";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShowError from "../../components/showErr";
import { homePageStore } from "../../utils/pageStore";
import ErrorContext from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";

const HomePage = () => {
  const page = homePageStore((state) => state.page);
  const setPage = homePageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    navigate(`?page=${page}`, { replace: true });
  }, [page, navigate]);

  const query = useQuery({
    queryKey: ["products", page, 10],
    queryFn: fetchProducts,
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

  const callback = () => {
    setErr(() => null);
  };

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

  return (
    <Transition>
      <main>
        <section className="h-full">
          <div>
            <h2 className="text-center">Products</h2>
          </div>
          <div className="h-12">
            {err && <ShowError error={err} callback={callback} />}
          </div>
          {query.isLoading && (
            <div className="flex justify-center items-center h-80">
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </div>
          )}
          {query.isSuccess && <ProductsList products={query.data.products} />}
        </section>
        <section className="flex justify-center items-center gap-6 py-4">
          <div>
            <button
              className="h-7 w-7 p-1 border border-black rounded-full"
              onClick={handlePrev}
              disabled={page === 1}
            >
              <ArrowLeft />
            </button>
          </div>
          <div>{`Page ${page}`}</div>
          <div>
            <button
              className="h-7 w-7 p-1 border border-black rounded-full"
              onClick={handleNext}
              disabled={!query.data?.hasNext}
            >
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default HomePage;
