import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchCustomer } from "../../utils/queries/customers/fetchcustomer";
import FetchCart from "../../components/customer-cart/fetchcart";
import PageSearchForm from "../../components/customer-cart/searchform";

const CustomerCartPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const _page = new URLSearchParams(window.location.search).get("page");
  const _query = new URLSearchParams(window.location.search).get("query");

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

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
  const query = String(_page) || "";

  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryFn: fetchCustomer,
    queryKey: ["customer", id as string],
  });

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const customer = data?.customer;

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
      <main role="main">
        {isLoading || !customer ? (
          <PageLoader />
        ) : (
          <div>
            <div>
              <h3 className="text-lg">
                <span className="font-bold">
                  {customer.firstName} {customer.lastName}{" "}
                </span>{" "}
                Cart Page
              </h3>
              <div>
                <PageSearchForm
                  placeholder="Search Cart"
                  label="Search cart for a specific product"
                />
              </div>
            </div>
            <FetchCart id={customer.id} page={page} query={query} />
          </div>
        )}
      </main>
    </Transition>
  );
};

export default CustomerCartPage;
