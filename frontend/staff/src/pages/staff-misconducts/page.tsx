import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import MisconductsFilterForm from "../../components/misconducts/filterform";
import PageSearchForm from "../../components/pagesearchform";
import { fetchStaffMisconducts } from "../../utils/queries/staff/fetchstaffmisconducts";

const MisconductItem = lazy(
  () => import("../../components/misconducts/misconduct"),
);

const Fallback = ({ misconductID }: { misconductID: string }) => {
  return (
    <Link
      className="md:h-[140px] h-[320px] md:w-[450px] w-[200px] border border-black flex justify-center items-center"
      to={`/misconducts/${misconductID}`}
    >
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

export default function StaffMisconductsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");
  const _action = params.get("action");

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    ManageQueryStr(navigate, _page, _query, _action, "action");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const query = _query || "";
  const action = _action || "";

  const { isLoading, isError, error, data, isSuccess } = useQuery({
    queryFn: fetchStaffMisconducts,
    queryKey: ["staff-misconducts", id || "", page, 16, query, action],
  });

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  const misconducts = data?.misconducts || [];

  return (
    <Transition>
      <Helmet>
        <title>Staff</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="relative pt-12">
        <p className="absolute top-4 left-4">
          <Link
            to={`/staff/${id}`}
            className="xl:no-underline underline xl:hover:underline"
          >
            Staff
          </Link>{" "}
          / <span className="font-bold">Misconducts</span>
        </p>
        <div className="flex md:flex-row flex-col justify-between md:items-start items-center md:px-2 px-0 md:mb-2 mb-4 md:gap-0 gap-4">
          <MisconductsFilterForm initial={action} queryStr={query} />
          <div className="md:w-64 w-72">
            <PageSearchForm
              placeholder="Search misconducts"
              other="action"
              otherValue={action}
            />
          </div>
        </div>
        {isLoading ? (
          <section className="page-loader-height flex justify-center items-center">
            <div className="h-10 w-10">
              <Loader color="#000" />
            </div>
          </section>
        ) : (
          <>
            {misconducts.length === 0 ? (
              <section className="page-loader-height flex justify-center items-center">
                <p className="text-xl font-semibold text-center">
                  No misconducts fouond for this customer
                </p>
              </section>
            ) : (
              <section className="page-loader-height">
                <ul className="grid xl:grid-cols-2 grid-cols-1">
                  {misconducts.map((misconduct) => (
                    <li key={misconduct.id} className="mx-auto md:mb-8 mb-6">
                      {/* Here is where it goes */}
                      <Suspense
                        fallback={<Fallback misconductID={misconduct.id} />}
                      >
                        <MisconductItem misconduct={misconduct} />
                      </Suspense>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div>
              <div className="md:block hidden">
                <Pagination
                  page={page}
                  data={data}
                  setPage={(n) => navigate(`?page=${n}&query=${query}`)}
                  to={90}
                />
              </div>
              <div className="md:hidden block">
                <Pagination
                  page={page}
                  data={data}
                  setPage={(n) => navigate(`?page=${n}&query=${query}`)}
                  to={150}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </Transition>
  );
}
