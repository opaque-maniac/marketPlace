import { useContext, useEffect } from "react";
import Transition from "../../components/transition";
import useUserStore from "../../utils/store";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../utils/queries/profile";
import Loader from "../../components/loader";
import { errorHandler } from "../../utils/errorHandler";
import { formatDate } from "../../utils/date";
import PhoneIcon from "../../components/icons/phone";
import EmailIcon from "../../components/icons/email";
import LocationPinIcon from "../../components/icons/pin";
import GearIcon from "../../components/icons/gear";
import MetaTags from "../../components/metacomponent";

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
      <MetaTags
        title="Profile | Hazina"
        description="Your profile page"
        keywords={[
          "profile",
          "profile page",
          "account",
          "hazina profile",
          "hazina account",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Profile</span>
        </p>
        <div className="absolute top-4 right-4">
          <Link
            aria-label="Go to settings"
            to={"/settings"}
            className="block w-7 h-7"
          >
            <GearIcon />
          </Link>
        </div>
        {query.isLoading && (
          <section
            className="flex justify-center items-center"
            style={{
              minHeight: "calc(100vh - 13.8rem)",
            }}
          >
            <div className="h-10 w-10">
              <Loader color="#000000" />
            </div>
          </section>
        )}
        {query.isSuccess && query.data ? (
          <>
            {customer ? (
              <section className="flex lg:flex-row flex-col justify-center items-center md:gap-14 gap-6">
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
                  <div className="pb-4">
                    <p className="text-xl font-semibold">{`${customer.firstName} ${customer.lastName}`}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-start items-center gap-1">
                      <div className="w-7 h-7 bg-black text-white rounded-full p-1">
                        <EmailIcon />
                      </div>
                      <p>{customer.email}</p>
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <div className="w-7 h-7 bg-black text-white rounded-full p-1">
                        <PhoneIcon />
                      </div>
                      <p>
                        Phone: <span>{customer.phone ?? "None"}</span>
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <div className="w-7 h-7 bg-black text-white rounded-full p-1">
                        <LocationPinIcon />
                      </div>
                      <p>
                        Address: <span>{customer.address ?? "None"}</span>
                      </p>
                    </div>
                    <div className="py-4">
                      <p>{formatDate(customer.createdAt)}</p>
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
