import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { fetchCustomers } from "../../utils/queries/customers/fetchcustomers";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";

const Customer = lazy(() => import("../../components/customers/customer"));

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

const CustomersPage = () => {
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const _page = new URLSearchParams(window.location.search).get("page");
  const _query = new URLSearchParams(window.location.search).get("query");

  useEffect(() => {
    if (!_page && !_query) {
      navigate("?page=1&query=", { replace: true });
    } else if (!_page) {
      navigate(`?page=1&query=${_query || ""}`, { replace: true });
    } else if (!_query) {
      navigate(`?page=${_page}&query=`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const queryStr = String(_query) || "";

  const query = useQuery({
    queryKey: ["products", page, 20, queryStr],
    queryFn: fetchCustomers,
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
  const customers = data?.customers || [];

  return (
    <Transition>
      <Helmet>
        <title>Customers</title>
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
          Home / <span className="font-extrabold">Customers</span>
        </p>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <PageLoader />
          ) : (
            <div className="h-full w-full">
              {customers.length === 0 ? (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full flex justify-center items-center"
                >
                  <div>
                    <p className="text-xl font-semibold">No Customers Found</p>
                  </div>
                </section>
              ) : (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="h-full"
                >
                  <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {customers.map((customer) => (
                      <li key={customer.id} className="mx-auto md:mb-8 mb-6">
                        <Suspense fallback={<Fallback />}>
                          <Customer customer={customer} />
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

export default CustomersPage;
