import { useContext, useEffect } from "react";
import Transition from "../../components/transition";
import useUserStore from "../../utils/store";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import Loader from "../../components/loader";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import { formatDate } from "../../utils/date";
import KeyIcon from "../../components/icons/key";

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
    queryKey: ["profile"],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
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
        <div className="absolute top-4 right-4">
          <Link to={"/settings"} className="block w-6 h-6">
            <KeyIcon />
          </Link>
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
            {customer ? (
              <section>
                <div className="flex lg:flex-row flex-col justify-center items-center md:gap-14 gap-6">
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
                    <div className="pb-2">
                      <p className="text-xl">{`${customer.firstName} ${customer.lastName}`}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div>
                        <p>{customer.email}</p>
                      </div>
                      <p>
                        Phone:{" "}
                        <span>{customer.phone ?? "No phone number"}</span>
                      </p>
                      <p>
                        Address: <span>{customer.address ?? "No address"}</span>
                      </p>
                      <p>
                        Joined: <span>{formatDate(customer.createdAt)}</span>
                      </p>
                    </div>
                    <div className="mx-auto flex md:justify-start justify-center items-center md:flex-row flex-col py-6 gap-6">
                      <Link
                        to={"/profile/update"}
                        className="h-10 w-40 rounded-lg bg-green-400 text-center text-white flex justify-center items-center font-semibold"
                      >
                        <span>Update Profile</span>
                      </Link>
                      <Link
                        to={"/profile/delete"}
                        className="h-10 w-40 rounded-lg bg-red-400 text-center text-white flex justify-center items-center font-semibold"
                      >
                        <span>Delete Profile</span>
                      </Link>
                    </div>
                  </div>
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
