import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { fetchProfile } from "../../utils/queries/profile";
import PageLoader from "../../components/pageloader";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryFn: fetchProfile,
    queryKey: ["profile"],
  });

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  return (
    <Transition>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="404 Not Found" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      {isLoading ? (
        <PageLoader />
      ) : (
        <main role="main" className="h-full pt-20 relative pb-4">
          <p className="absolute top-4 left-4">
            {" "}
            Home / <span className="font-extrabold">Profile</span>
          </p>
        </main>
      )}
    </Transition>
  );
}
