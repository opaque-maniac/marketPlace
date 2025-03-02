import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import { fetchComplaints } from "../../utils/queries/complaints/fetchcomplaints";
import ComplaintsFilterForm from "../../components/complaints/filterform";
import ManageQueryStr from "../../utils/querystr";

const Complaint = lazy(() => import("../../components/complaints/complaint"));

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

const ComplaintsPage = () => {
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");
  const _resolved = params.get("resolved");

  useEffect(() => {
    ManageQueryStr(navigate, _page, _query, _resolved, "resolved");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = _query || "";
  const resolved = _resolved || "";

  const query = useQuery({
    queryKey: ["complaints", page, 12, queryStr, resolved],
    queryFn: fetchComplaints,
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
  const complaints = data?.complaints || [];

  return (
    <Transition>
      <Helmet>
        <title>Complaints</title>
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
          Home / <span className="font-extrabold">Complaints</span>
        </p>
        <div className="md:absolute md:top-2 md:right-4">
          <ComplaintsFilterForm initial={resolved} queryStr={queryStr} />
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {complaints.length === 0 ? (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full flex justify-center items-center"
                >
                  <div>
                    <p className="text-xl font-semibold">
                      No Complaints Found {queryStr && `For ${queryStr}`}
                      {resolved &&
                        `That Are ${
                          resolved === "true" ? "Resolved" : "Not Resolved"
                        }`}
                    </p>
                  </div>
                </section>
              ) : (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full"
                >
                  <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {complaints.map((complaint) => (
                      <li key={complaint.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense fallback={<Fallback />}>
                          <Complaint complaint={complaint} />
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
};

export default ComplaintsPage;
