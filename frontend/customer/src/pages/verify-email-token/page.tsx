import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendVerifyEmailToken } from "../../utils/mutations/security/sendverifyemailtoken";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

export default function VerifyEmailTokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [success, setSuccess] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: sendVerifyEmailToken,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
      setSuccess(false);
    },
    onSuccess: () => {
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

  return (
    <Transition>
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Verify Email</span>
        </p>

        <h2 className="text-2xl font-bold text-center">
          Verify Your Email Address
        </h2>

        {isPending ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="w-10 h-10">
              <Loader color="#000" />
            </div>
          </div>
        ) : (
          <section className="md:w-8/12 w-full lg:mx-auto">
            {success ? (
              <div>
                <p className="text-gray-600 text-center">
                  Your email has been verified. You can now login to your
                  account.
                </p>
                <p className="text-gray-600 text-center">
                  If you have any questions, please contact us from{" "}
                  <Link to={"/contact"} className="undeline text-blue-500">
                    here
                  </Link>
                  .
                </p>

                <div>
                  <Link
                    to={"/login"}
                    className="block w-40 h-12 bg-blue-500 text-white rounded-md text-center mt-4 pt-2 mx-auto"
                  >
                    Login
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600">
                  Failed to verify your email address. Click the button below to
                  resend the verification email to you email inbox
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
                    to={"/verify-email"}
                    className="block w-40 h-12 bg-blue-500 text-white rounded-md text-center mt-4 mx-auto pt-2"
                  >
                    Verify Email
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
