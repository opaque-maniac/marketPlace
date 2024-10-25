import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { customersSearchPageStore } from "../../utils/pageStore";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { searchCustomers } from "../../utils/queries/customers";
import Customer from "../../components/customers/customer";

const CustomersSearchPage = () => {
  const page = customersSearchPageStore((state) => state.page);
  const setPage = customersSearchPageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const { _query } = useParams();

  // When page mounts
  useEffect(() => {
    if (!_query) {
      navigate("/customers", { replace: true });
    }
    setPage(1);

    return () => {
      setPage(1);
    };
  }, [setPage, navigate, _query]);

  const query = useQuery({
    queryKey: ["query", page, 20, _query as string],
    queryFn: searchCustomers,
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
  const customers = data?.customers || [];

  return (
    <Transition>
      <Helmet>
        <title>Customers Search</title>
        <meta
          name="description"
          content="Customers search page for Hazina staff app"
        />
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
              {customers.length === 0 ? (
                <section
                  style={{ minHeight: "calc(100vh - 1.4rem )" }}
                  className="flex justify-center items-center"
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
                  <ul className="flex md:justify-evenly justify-center items-center md:flex-row flex-col md:gap-0 gap-4">
                    {customers.map((customer) => (
                      <li key={customer.id}>
                        <Customer customer={customer} />
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

export default CustomersSearchPage;
