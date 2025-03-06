import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { fetchProfile } from "../../utils/queries/profile";
import PageLoader from "../../components/pageloader";
import { Link, useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import GearIcon from "../../components/icons/gear";
import Loader from "../../components/loader";

const ProfileUpdateForm = lazy(
  () => import("../../components/profile-update/form"),
);

const Fallback = () => {
  return (
    <div className="md:w-5/12 w-11/12 h-[450px] border border-black mx-auto flex justify-center items-center">
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function UpdateProfilePage() {
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

  const profile = data?.data;

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
            Home / <span className="font-extrabold">Profile Update</span>
          </p>
          <div className="absolute top-4 right-4">
            <Link to={"/settings"} className="block w-6 h-6">
              <GearIcon />
            </Link>
          </div>
          {profile && (
            <Suspense fallback={<Fallback />}>
              <section className="md:w-5/12 w-11/12 h-[450px] mx-auto border shadow-lg shadow-gray-300 py-4">
                <div className="mb-2 underline">
                  <h3 className="text-lg font-semibold text-center">
                    Update Profile
                  </h3>
                </div>
                <ProfileUpdateForm profile={profile} />
              </section>
            </Suspense>
          )}
        </main>
      )}
    </Transition>
  );
}
