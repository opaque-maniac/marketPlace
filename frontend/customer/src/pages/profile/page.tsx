import { useContext, useEffect } from "react";
import Transition from "../../components/transition";
import useUserStore from "../../utils/store";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import Loader from "../../components/loader";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import { Helmet } from "react-helmet";

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

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
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const [show, url] = errorHandler(error.errorCode);
      if (show) {
        setErr(error.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const customer = query.data?.data;

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
            {customer ? (
              <section>
                <div className="md:w-10/12 w-11/12 mx-auto rounded-lg shadow-xl border flex justify-around items-center md:flex-row flex-col mb-10 md:gap-0 gap-4 py-2">
                  <div>
                    <img
                      src={
                        customer.image
                          ? `http://localhost:3000/uploads/seller/${customer.image.url}`
                          : "/images/profile.svg"
                      }
                      alt={`${customer.firstName} ${customer.lastName}`}
                      className="w-80 h-80"
                    />
                  </div>
                  <div>
                    <p>{`${customer.firstName} ${customer.lastName}`}</p>
                    <p>{customer.email}</p>
                    <p>
                      Phone: <span>{customer.phone ?? "No phone number"}</span>
                    </p>
                    <p>
                      Address: <span>{customer.address ?? "No address"}</span>
                    </p>
                    <p>
                      Joined: <span>{customer.createdAt}</span>
                    </p>
                    <p>
                      Last updated: <span>{customer.updatedAt}</span>
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
