import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { fetchSellers } from "../../utils/queries/sellers/fetchsellers";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import ManageQueryStr from "../../utils/querystr";
import ProfileActiveSelectForm from "../../components/activequeryform";

const SellerItem = lazy(() => import("../../components/sellers/seller"));

const Fallback = () => {
  return (
    <div
      role="banner"
      className="flex justify-center items-center h-350 w-270 border pt-1"
    >
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function SellersPage() {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");
  const _active = params.get("active");

  useEffect(() => {
    ManageQueryStr(navigate, _page, _query, _active, "active");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";
  const activeStr = _active || "";

  const query = useQuery({
    queryKey: ["sellers", page, 20, queryStr, activeStr],
    queryFn: fetchSellers,
  });

  if (query.isError) {
    //errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const data = query.data;
  const sellers = data?.sellers || [];

  return (
    <Transition>
      <Helmet>
        <title>Sellers</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pt-12 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Sellers</span>
        </p>
        <div className="md:absolute md:top-2 md:right-4">
          <ProfileActiveSelectForm
            initial={activeStr}
            queryStr={queryStr}
            label="staff"
          />
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {sellers.length === 0 ? (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full flex justify-center items-center"
                >
                  <div>
                    <p className="text-xl font-semibold">
                      No Sellers Found {queryStr && `For ${queryStr}`}
                      {activeStr &&
                        `Who Are ${activeStr == "true" ? "Active" : "Not Active"}`}
                    </p>
                  </div>
                </section>
              ) : (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full"
                >
                  <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {sellers.map((seller) => (
                      <li key={seller.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense fallback={<Fallback />}>
                          <SellerItem seller={seller} />
                        </Suspense>
                      </li>
                    ))}
                  </ul>
                </section>
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
}
