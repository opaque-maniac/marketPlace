import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import PageLoader from "../../components/pageloader";
import { errorHandler } from "../../utils/errorHandler";
import { apiHost, apiProtocol } from "../../utils/generics";
import { fetchIndividualStaff } from "../../utils/queries/staff/fetchindividualstaff";
import { disableStaff } from "../../utils/mutations/staff/disablestaff";
import MisconductsInputForm from "../../components/profile-delete/form";

export default function StaffDisablePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery({
    queryFn: fetchIndividualStaff,
    queryKey: ["individual-staff", id as string],
  });

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const refetchCallback = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staff = data?.staff;

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
      <main role="main">
        {isLoading || !staff ? (
          <PageLoader />
        ) : (
          <div className="h-full w-full flex justify-start xl:justify-center items-center md:items-start xl:flex-row flex-col gap-4 pt-4">
            <section className="w-[300px] h-[300px] md:w-6/12">
              <img
                src={
                  staff.image
                    ? `${apiProtocol}://${apiHost}/${staff.image.url}`
                    : "/images/profile.svg"
                }
                alt={`${staff.firstName} ${staff.lastName}`}
                className="h-full w-full"
              />
            </section>
            <section className="md:w-5/12">
              <div className="mb-2">
                <h3 className="text-lg font-semibold">{`${staff.firstName} ${staff.lastName}`}</h3>
              </div>
              <div>
                <p>
                  Are your sure you want to disable the profile of this staff,
                  if you are, you need to make sure you file a misconduct log
                  for the user. If none exists then you will not be able to
                  proceed. Click{" "}
                  <Link
                    to={"/new-misconduct"}
                    className="font-semibold underline text-lg"
                  >
                    here
                  </Link>{" "}
                  below to file a misconduct.
                </p>
              </div>
              <div>
                <h4>Select misconduct</h4>
                <div>
                  <MisconductsInputForm
                    callback={`/staff/${id}`}
                    success={() => {
                      navigate(`/staff/${id}`);
                    }}
                    id={id || ""}
                    disable={true}
                    refetch={refetchCallback}
                    mutationFn={disableStaff}
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </Transition>
  );
}
