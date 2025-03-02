import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import { fetchMisconducts } from "../../utils/queries/misconducts/fetchmisconducts";
import ManageQueryStr from "../../utils/querystr";
import MisconductsFilterForm from "../../components/misconducts/filterform";

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

export default function MisconductsPage() {
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");
  const _action = params.get("action");

  useEffect(() => {
    ManageQueryStr(navigate, _page, _query, _action, "action");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";
  const action = _action || "";

  const query = useQuery({
    queryKey: ["misconducts", page, 12, queryStr, action],
    queryFn: fetchMisconducts,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
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
  const misconducts = data?.misconducts || [];

  return (
    <Transition>
      <Helmet>
        <title>Misconducts</title>
        <meta
          name="description"
          content="Complaints page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pt-12 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Misconducts</span>
        </p>
        <div className="md:absolute md:top-2 md:right-4">
          <MisconductsFilterForm initial={action} queryStr={queryStr} />
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {misconducts.length === 0 ? (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full flex justify-center items-center"
                >
                  <div>
                    <p className="text-xl font-semibold">
                      No Misconducts Found {queryStr && `For ${queryStr}`}{" "}
                      {action && `With Action ${action}`}
                    </p>
                  </div>
                </section>
              ) : (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full"
                >
                  <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {misconducts.map((misconduct) => (
                      <li key={misconduct.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense fallback={<Fallback />}>
                          {misconduct.id}
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
