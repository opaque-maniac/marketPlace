import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { sendResetPasswordToken } from "../../utils/mutations/security/sendresetpasswordtoken";

const ResetPasswordNewPasswordForm = lazy(
  () => import("../../components/security/reset-password-newpassword-form"),
);

const FormFallback = () => {
  return (
    <div className="w-[256px] h-[112px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function ResetPasswordTokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [nToken, setNToken] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetPasswordToken,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
      setSuccess(false);
    },
    onSuccess: (data) => {
      setSuccess(true);
      setNToken(data.token);
    },
  });

  const setSuccessFalse = () => {
    setSuccess(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/404", { replace: true });
    } else {
      mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition>
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Verify Email</span>
        </p>

        <h2 className="text-2xl font-bold">Verify Your Email Address</h2>

        {isPending ? (
          <div className="flex justify-center items-center md:min-h-[800px] min-h-[600px]">
            <div className="w-10 h-10">
              <Loader color="#000" />
            </div>
          </div>
        ) : (
          <section className="md:w-8/12 w-full lg:mx-auto">
            {success && token ? (
              <div>
                <p className="text-gray-600">
                  Please enter your new password in the form below. Due to
                  security reasons, this form will expire in 20 minutes after
                  which you will need to request a new password reset email.
                </p>
                <p className="text-gray-600">
                  If you have any questions, please contact us from{" "}
                  <Link to={"/contact"} className="undeline text-blue-500">
                    here
                  </Link>
                  .
                </p>

                <div>
                  {/* Form goes here */}
                  <Suspense fallback={<FormFallback />}>
                    <ResetPasswordNewPasswordForm
                      token={nToken as string}
                      error={setSuccessFalse}
                    />
                  </Suspense>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Failed to reset your password. Click the button below to
                  resend the verification email to you mail inbox.
                </p>

                <p className="text-gray-600">
                  If you have any questions, please contact us from{" "}
                  <Link to={"/contact"} className="undeline text-blue-500">
                    here
                  </Link>
                  .
                </p>

                <div>
                  <Link
                    to={"/reset-password"}
                    className="block min-w-40 h-12 bg-blue-500 text-white rounded-md text-center mt-4 mx-auto"
                  >
                    Reset Password
                  </Link>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </Transition>
  );
}
