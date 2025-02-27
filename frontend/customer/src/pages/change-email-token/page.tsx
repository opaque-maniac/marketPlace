import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { ShowErrorContext } from "../../utils/errorContext";
import { sendChangeEmailToken } from "../../utils/mutations/security/sendchangeemailtoken";
import MetaTags from "../../components/metacomponent";
import GearIcon from "../../components/icons/gear";

export default function ResetPasswordTokenPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [success, setSuccess] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: sendChangeEmailToken,
    onError: () => {
      setErr("Failed to verify email address.");
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
      <MetaTags
        title="Change Email | Hazina"
        description="Change email address temporary page"
        keywords={[
          "change email",
          "change email address token",
          "change email hazina link",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Verify Email</span>
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
                  updated. You can now see it in your profile. Click the button
                  below to go back to your profile page.
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
                  <Link
                    to={"/profile"}
                    className="flex justify-center items-center w-40 h-12 bg-blue-500 text-white rounded-md"
                  >
                    <span>Profile</span>
                  </Link>
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
                    to={"/change-email"}
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
