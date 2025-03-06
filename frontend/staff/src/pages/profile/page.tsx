import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { fetchProfile } from "../../utils/queries/profile";
import PageLoader from "../../components/pageloader";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { apiHost, apiProtocol } from "../../utils/generics";
import EmailIcon from "../../components/icons/email";
import PhoneIcon from "../../components/icons/phone";
import LocationPinIcon from "../../components/icons/pin";
import { formatDate } from "../../utils/date";
import GearIcon from "../../components/icons/gear";

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

  const profile = data?.data;

  return (
    <Transition>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile page" />
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
          <div className="absolute top-4 right-4">
            <Link to={"/settings"} className="block w-6 h-6">
              <GearIcon />
            </Link>
          </div>
          {profile && (
            <div className="flex lg:flex-row flex-col justify-center items-center md:gap-14 gap-6">
              <section>
                <img
                  src={
                    profile.image
                      ? `${apiProtocol}://${apiHost}/uploads/seller/${profile.image.url}`
                      : "/images/profile.svg"
                  }
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-80 h-80"
                />
              </section>
              <section>
                <div className="pb-4">
                  <p className="text-xl font-semibold">{`${profile.firstName} ${profile.lastName}`}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-start items-center gap-1">
                    <div className="w-7 h-7 bg-black text-white rounded-full p-1">
                      <EmailIcon />
                    </div>
                    <p>{profile.email}</p>
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="w-7 h-7 bg-black text-white rounded-full p-1">
                      <PhoneIcon />
                    </div>
                    <p>
                      Phone: <span>{profile.phone ?? "None"}</span>
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="w-7 h-7 bg-black text-white rounded-full p-1">
                      <LocationPinIcon />
                    </div>
                    <p>
                      Address: <span>{profile.address ?? "None"}</span>
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="font-semibold">{profile.role}</p>
                  </div>
                  <div>
                    <p>{formatDate(profile.createdAt)}</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      )}
    </Transition>
  );
}
