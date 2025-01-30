import { useContext, useEffect, useState } from "react";
import Transition from "../../components/transition";
import useUserStore from "../../utils/store";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import Loader from "../../components/loader";
import ShowError from "../../components/showErr";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError(() => true);
      navigate("/500", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryFn: fetchProfile,
    queryKey: ["profile", user as string],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const callback = () => {
    setErr(() => null);
  };

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
        <div className="h-12">
          {err && <ShowError error={err} callback={callback} />}
        </div>
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
            {query.data.seller ? (
              <section>
                <div className="md:w-10/12 w-11/12 mx-auto rounded-lg shadow-xl border flex justify-around items-center md:flex-row flex-col mb-10 md:gap-0 gap-4 py-2">
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
                    <p>{query.data.seller.name}</p>
                    <p>{query.data.seller.email}</p>
                    <p>
                      Phone: <span>{query.data.seller.phone}</span>
                    </p>
                    <p>
                      Address: <span>{query.data.seller.address}</span>
                    </p>
                    <p>
                      Joined: <span>{query.data.seller.createdAt}</span>
                    </p>
                    <p>
                      Last updated: <span>{query.data.seller.updatedAt}</span>
                    </p>
                  </div>
                </div>
                <div className="md:w-10/12 w-11/12 mb-8 mx-auto rounded-lg shadow-xl border flex justify-around items-center md:flex-row flex-col py-4 md:gap-0 gap-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/profile/update");
                    }}
                    aria-label="Update Profile"
                    className="h-10 w-40 rounded-lg bg-green-400 text-center"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/profile/delete");
                    }}
                    aria-label="Delete Profile"
                    className="h-10 w-40 rounded-lg bg-red-400 text-center"
                  >
                    Delete Profile
                  </button>
                </div>
              </section>
            ) : null}
          </>
        ) : null}
      </main>
    </Transition>
  );
};

export default ProfilePage;
