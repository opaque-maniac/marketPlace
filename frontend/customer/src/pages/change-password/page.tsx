import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import MetaTags from "../../components/metacomponent";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestChangePasswordEmail } from "../../utils/mutations/security/requestchangepasswordemail";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import GearIcon from "../../components/icons/gear";
import PageLoader from "../../components/pageloader";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setMessage] = useContext(ShowMessageContext);
  const [email, setEmail] = useState<string | null>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: requestChangePasswordEmail,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
      setEmail(null);
    },
    onSuccess: (data) => {
      setEmail(data.email);
      setMessage("Email has been sent");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    },
  });

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Transition>
      <MetaTags
        title="Change Password | Hazina"
        description="Change profile password request page"
        keywords={[
          "change password",
          "change password request",
          "request change password",
          "request change password email",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Change Password</span>
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

        {isPending ? (
          <PageLoader />
        ) : (
          <section className="md:w-8/12 w-full md:mx-auto">
            <h2 className="text-2xl font-bold text-center">
              Change Profile Password
            </h2>
            <div className="pb-8 md:pl-0 pl-4">
              {email ? (
                <>
                  <p className="text-gray-600">
                    We have an email to your email inbox at{" "}
                    <span className="font-semibold italic">{email}</span>. The
                    email will contain a link. Click the link to be directed to
                    a page where you can change your password.
                  </p>
                  <p className="text-gray-600">
                    The link will expire in 10 minutes. If you do not verify
                    your email address within 10 minutes, you will need to
                    request a new verification email.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-600">
                    There was an issue sending the email. Click the button below
                    to try again. This will attempt to send you the email again.
                  </p>
                  <p className="text-gray-600">
                    If the issue persists, contact our support team and they
                    will attempt to resolve the issue for you. We apologize for
                    any inconvenience.
                  </p>
                </>
              )}

              <div>
                <button
                  aria-label="resend email"
                  onClick={clickHandler}
                  className="flex justify-center items-center bg-blue-500 text-white rounded-md h-12 w-52 mx-auto mt-4"
                >
                  <span>Resend Verification Email</span>
                </button>
              </div>

              <p className="text-gray-600">
                For any questions, please contact us{" "}
                <Link to={"/contact"} className="undeline text-blue-500">
                  here
                </Link>
                .
              </p>
            </div>
          </section>
        )}
      </main>
    </Transition>
  );
}
