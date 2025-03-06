import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import { lazy, Suspense } from "react";
import Loader from "../../components/loader";
import MetaTags from "../../components/metacomponent";

const VerifyEmailForm = lazy(
  () => import("../../components/security/verify-email-form"),
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

export default function VerifyEmailPage() {
  return (
    <Transition>
      <MetaTags
        title="Verify Email | Hazina"
        description="Verify your email address on Hazina"
        keywords={[
          "verify email",
          "verify email hazina",
          "verify email account",
          "verify email address",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Verify Email</span>
        </p>

        <section className="md:w-8/12 w-full md:mx-auto">
          <h2 className="text-2xl font-bold text-center">
            Verify Your Email Address
          </h2>
          <div className="pb-8 md:pl-0 pl-4">
            <p className="text-gray-600">
              Enter your email address below to receive a verification link. If
              you do not receive the email within a few minutes, please check
              your spam folder. If you still do not receive the email, please
              contact us{" "}
            </p>
            <p className="text-gray-600">
              The link will expire in 10 minutes. If you do not verify your
              email address within 10 minutes, you will need to request a new
              verification email.
            </p>

            <p className="text-gray-600">
              For any questions, please contact us{" "}
              <Link to={"/contact"} className="undeline text-blue-500">
                here
              </Link>
              .
            </p>
          </div>

          <div>
            <Suspense fallback={<FormFallback />}>
              <VerifyEmailForm />
            </Suspense>
          </div>
        </section>
      </main>
    </Transition>
  );
}
