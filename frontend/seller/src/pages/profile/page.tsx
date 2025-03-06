import { lazy, Suspense, useContext, useEffect } from "react";
import Transition from "../../components/transition";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import Loader from "../../components/loader";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import { formatDate } from "../../utils/date";
import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import LocationPinIcon from "../../components/icons/pin";
import ProfileBio from "../../components/profile/bio";

const ProfileDeleteButton = lazy(
  () => import("../../components/profile/deleteprofilebutton"),
);

const Fallback = () => {
  return (
    <button
      aria-label="Loading"
      disabled
      className="flex justify-center items-center h-10 w-40 rounded-lg bg-red-500 text-white"
    >
      <div className="w-6 h-6">
        <Loader color="#fff" />
      </div>
    </button>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    const prefetch = async () => {
      try {
        await import("../../components/profile/deleteprofilebutton");
      } catch (e) {
        console.log("Error prefetching", e);
        setError(true);
        navigate("/500");
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prefetch();
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
        <title>Profile</title>
        <meta name="description" content="Hazina seller app profile page" />
        <meta name="bots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Profile</span>
        </p>
        {query.isLoading && (
          <section className="flex justify-center items-center h-screen">
            <div className="h-10 w-10">
              <Loader color="#000000" />
            </div>
          </section>
        )}
        {query.isSuccess && query.data ? (
          <>
            {query.data.seller ? (
              <>
                <section className="flex md:flex-row flex-col justify-center items-center md:gap-20 gap-6 pb-4">
                  <div>
                    <img
                      src={
                        query.data.seller.image
                          ? `http://localhost:3000/uploads/seller/${query.data.seller.image.url}`
                          : "/images/profile.svg"
                      }
                      alt={query.data.seller.name}
                      className="w-80 h-80"
                    />
                  </div>
                  <div>
                    <div className="pb-4">
                      <h3 className="text-xl font-semibold">
                        {query.data.seller.name}
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <div className="flex justify-start items-center gap-1">
                          <div className="w-7 h-7 text-white bg-black rounded-full p-1">
                            <EmailIcon />
                          </div>
                          <p>{query.data.seller.email}</p>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-start items-center gap-1">
                          <div className="w-7 h-7 text-white bg-black rounded-full p-1">
                            <PhoneIcon />
                          </div>
                          <p>
                            Phone:{" "}
                            <span>{query.data.seller.phone ?? "None"}</span>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-start items-center gap-1">
                          <div className="w-7 h-7 text-white bg-black rounded-full p-1">
                            <LocationPinIcon />
                          </div>
                          <p>
                            Address: <span>{query.data.seller.address}</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                    <p>{formatDate(query.data.seller.createdAt)}</p>

                    {/* Links */}
                    <div className="flex xl:flex-row flex-col xl:justify-start justify-center items-center xl:gap-10 gap-4 pt-4">
                      <Link
                        to={"/profile/update"}
                        className="flex justify-center items-center h-10 w-40 rounded-lg bg-green-500 text-white"
                      >
                        <span>Update Profile</span>
                      </Link>
                      <Suspense fallback={<Fallback />}>
                        <ProfileDeleteButton />
                      </Suspense>
                    </div>
                  </div>
                </section>
                <section className="w-full border-t border-black-50 ">
                  <div className="pb-2">
                    <h3 className="text-center text-xl font-bold underline">
                      Bio
                    </h3>
                  </div>
                  <div>
                    {query.data.seller.bio ? (
                      <ProfileBio bio={query.data.seller.bio} />
                    ) : (
                      <div className="h-[250px] w-full flex justify-center items-center">
                        <p className="text-center text-lg font-semibold">
                          No bio available
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </>
            ) : null}
          </>
        ) : null}
      </main>
    </Transition>
  );
};

export default ProfilePage;
