import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { ShowErrorContext } from "../../utils/errorContext";
import { sendChangePasswordToken } from "../../utils/mutations/security/sendchangepasswordtoken";

const PasswordForm = lazy(
  () => import("../../components/security/change-password-newpassword-form"),
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

export default function ChangePasswordTokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [success, setSuccess] = useState<boolean>(false);
  const [nToken, setNToken] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: sendChangePasswordToken,
    onError: () => {
      setErr("Failed to verify email address.");
      setSuccess(false);
    },
    onSuccess: (data) => {
      setNToken(data.token);
      setSuccess(true);
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/404", { replace: true });
    } else {
      mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlError = () => {
    setSuccess(false);
  };

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
            {success ? (
              <div>
                <p className="text-gray-600">
                  Your email has been verified successfully and has been
                  updated. Please enter your new password into the form below to
                  update the password in your account.
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
                    <PasswordForm token={nToken} error={handlError} />
                  </Suspense>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Failed to verify your new email address. You can click the
                  button below to try again. If you continue to have problems,
                  please contact us and we will get back to you as soon as
                  possible.
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
                    to={"/change-password"}
                    className="block w-52 h-12 bg-blue-500 text-white rounded-md text-center mt-4 mx-auto"
                  >
                    <span>Try Again</span>
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
