import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { fetchMaskedEmail } from "../../utils/queries/security/fetchemail";
import Loader from "../../components/loader";
import { errorHandler } from "../../utils/errorHandler";
import { Link, useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import GearIcon from "../../components/icons/gear";

const PasswordChangeButton = lazy(() => import("./button"));

const Fallback = () => {
  return (
    <div className="pt-4">
      <button
        aria-label="Request email"
        className="bg-blue-500 flex justify-center items-center w-40 h-11 rounded text-white gap-2 mx-auto"
        disabled
      >
        <div className="h-6 w-6">
          <Loader color="#fff" />
        </div>
      </button>
    </div>
  );
};

export default function ChangePasswordRequestPage() {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isLoading, isError, error, data } = useQuery({
    queryFn: fetchMaskedEmail,
    queryKey: ["email"],
  });

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const email = data?.email;

  return (
    <Transition>
      <main role="main" className="relative pt-14">
        <p className="absolute top-4 left-4">
          Home / <span className="font-extrabold">Change Password</span>
        </p>
        <div className="absolute top-4 right-4">
          <Link
            aria-label="Go back to settings"
            to={"/settings"}
            className="block w-7 h-7"
          >
            <GearIcon />
          </Link>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-center">
            Change Password
          </h3>
        </div>
        {isLoading ? (
          <div
            style={{ height: "calc(100vh - 14rem)" }}
            className="flex justify-center items-center w-full"
          >
            <div className="h-10 w-10">
              <Loader color="#000" />
            </div>
          </div>
        ) : (
          <div>
            <section>
              <div className="xl:w-6/12 md:w-8/12 mx-auto text-center">
                <p>
                  To change the password currently on this profile, an email
                  with a link will be sent to the email address that is
                  currently in your profile:{" "}
                  <span className="font-semibold">{email}</span>
                </p>
                <div className="py-4">
                  <p className="text-sm">
                    In case of any issues,{" "}
                    <Link
                      to={"/contact"}
                      className="text-blue-500 xl:no-underline underline xl:hover:underline"
                    >
                      click here to contact us
                    </Link>
                  </p>
                </div>
                <div>
                  <p>Click button to request email</p>
                </div>
                <Suspense fallback={<Fallback />}>
                  <PasswordChangeButton />
                </Suspense>
              </div>
            </section>
          </div>
        )}
      </main>
    </Transition>
  );
}
