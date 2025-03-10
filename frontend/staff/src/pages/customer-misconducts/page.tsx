import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import PageSearchForm from "../../components/customer-cart/searchform";
import ManageQueryStr from "../../utils/querystr";
import Loader from "../../components/loader";
import { fetchCustomerMisconducts } from "../../utils/queries/customers/fetchcustomermisconducts";

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

export default function CustomerMisconductsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    ManageQueryStr(navigate, _page, _query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const query = _query || "";

  const { isLoading, isError, error, data, isSuccess } = useQuery({
    queryFn: fetchCustomerMisconducts,
    queryKey: ["customer-misconducts", id || "", page, 16, query],
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
        <title>Customers</title>
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
          Home / <span className="font-bold">Customer's Misconducts</span>
        </p>
        <div className="w-52 h-12 absolute top-2 right-4">
          <PageSearchForm
            placeholder="Search misconducts"
            label="Search customer orders"
          />
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
          </>
        )}
      </main>
    </Transition>
  );
}
