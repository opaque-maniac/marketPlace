import { lazy, Suspense, useContext, useEffect } from "react";
import Transition from "../../components/transition";
import useUserStore from "../../utils/store";
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
    <div className="xl:h-[290px] xl:w-[758px] lg:w-[592px] md:h-[495px] md:w-[473px] h-[472px] w-[344px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

const UpdateProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/500", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div>
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
              {query.data.data && (
                <Suspense fallback={<Fallback />}>
                  <ProfileForm profile={query.data.data} />{" "}
                </Suspense>
              )}
            </>
          ) : null}
        </div>
        <div className="pt-8 w-full flex justify-center">
          <Link
            className="mx-auto xl:no-underline underline xl:hover:underline"
            to={`/settings`}
          >
            Cancel
          </Link>
        </div>
      </main>
    </Transition>
  );
};

export default UpdateProfilePage;
