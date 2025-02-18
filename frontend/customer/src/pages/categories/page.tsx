import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { fetchCategoryProducts } from "../../utils/queries/products/fetchcategoryproducts";
import ProductList from "../../components/products/productlist";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

const CategoriesPage = () => {
  const { category } = useParams();
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (!category) {
      navigate("/404", { replace: true });
      return;
    }

    if (!urlParams.get("page")) {
      navigate(`?page=1`, { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(urlParams.get("page")) || 1;
  const query = useQuery({
    queryKey: ["products", page, 20, category as string],
    queryFn: fetchCategoryProducts,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}`);
    }
  };

  const data = query.data?.data;

  return (
    <Transition>
      <MetaTags
        title={`${category} | Hazina`}
        description={`Hazina marketplace category page for ${category} products`}
        keywords={[
          "category",
          `${category}`,
          "products",
          `${category} products`,
          `Hazina ${category} products`,
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main">
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div
              style={{ minHeight: "calc(100vh - 1.4rem )" }}
              className="h-full w-full"
            >
              {data && (
                <ProductList
                  full={true}
                  products={data}
                  color="black"
                  overflow={false}
                />
              )}
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-2">
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

export default CategoriesPage;
