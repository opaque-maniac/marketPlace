import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
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
            <div className="flex md:flex-row flex-col md:justify-between justify-start md:items-start items-center md:gap-0 gap-4 mt-2">
              <h3>
                <Link
                  to={`/customers/${customer.id}`}
                  className="font-bold text-lg xl:no-underline underline xl:hover:underline"
                >
                  {customer.firstName} {customer.lastName}{" "}
                </Link>{" "}
                Cart Page
              </h3>
              <div className="h-10 w-[200px]">
                <PageSearchForm
                  placeholder="Search Cart"
                  label="Search cart for a specific product"
                />
              </div>
            </div>
            <FetchCart id={customer.id} />
          </div>
        )}
      </main>
    </Transition>
  );
};

export default CustomerCartPage;
