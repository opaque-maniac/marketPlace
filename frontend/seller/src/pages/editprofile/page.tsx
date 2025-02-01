import { lazy, Suspense, useContext } from "react";
import Transition from "../../components/transition";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import Loader from "../../components/loader";
import { errorHandler } from "../../utils/errorHandler";

const ProfileForm = lazy(() => import("./form"));

const Fallback = () => {
  return (
    <div className="lg:w-8/12 md:w-9/12 w-11/12 xl:h-[328px] h-[568px] flex justify-center items-center">
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </div>
  );
};

const UpdateProfilePage = () => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchProfile,
    queryKey: ["profile"],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  return (
    <Transition>
      <Helmet>
        <title>Update Profile</title>
        <meta
          name="description"
          content="Hazina seller app profile update page"
        />
        <meta name="bots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Update Profile</span>
        </p>
        <section>
          {query.isLoading && (
            <section
              className="flex justify-center items-center"
              style={{
                minHeight: "calc(100vh - 13.8rem)",
              }}
            >
              <div className="h-20 w-20">
                <Loader color="#000000" />
              </div>
            </section>
          )}
          {query.isSuccess && query.data ? (
            <>
              {query.data.seller && (
                <>
                  <Suspense fallback={<Fallback />}>
                    <ProfileForm profile={query.data.seller} />{" "}
                  </Suspense>
                  <div className="h-10 flex justify-center items-center">
                    <Link className="underline font-semibold" to={"/profile"}>
                      Cancel
                    </Link>
                  </div>
                </>
              )}
            </>
          ) : null}
        </section>
      </main>
    </Transition>
  );
};

export default UpdateProfilePage;
