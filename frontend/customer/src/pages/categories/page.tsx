import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { fetchCategoryProducts } from "../../utils/queries/products/fetchcategoryproducts";
import ProductList from "../../components/products/productlist";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";
import Loader from "../../components/loader";
import ProductItem from "../../components/products/product";

const Fallback = ({ color, url }: { color: string; url: string }) => {
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
};

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

  const data = query.data?.data || [];

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
            <section className="page-loader-height w-full flex justify-center items-center">
              <div className="w-10 h-10">
                <Loader color="#000" />
              </div>
            </section>
          ) : (
            <div className="h-full w-full">
              {data.length === 0 ? (
                <div className="page-loader-height">
                  <p className="md:w-6/12">
                    No {category || ""} products found
                  </p>
                </div>
              ) : (
                <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                  {data.map((product) => (
                    <li key={product.id} className="mx-auto md:mb-8 mb-6">
                      <Suspense
                        fallback={
                          <Fallback
                            color="#000"
                            url={`/products/${product.id}`}
                          />
                        }
                      >
                        <ProductItem
                          product={product}
                          border="black"
                          color="black"
                        />
                      </Suspense>
                    </li>
                  ))}
                </ul>
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
