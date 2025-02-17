import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import ChangeEmailForm from "../../components/security/change-email-form";
import { Suspense } from "react";

const FormFallback = () => {
  return (
    <div className="w-[256px] h-[112px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function ChangeEmailPage() {
  return (
    <Transition>
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Change Email</span>
        </p>

        <h2 className="text-2xl font-bold text-center">Change Email</h2>
        <section className="md:w-8/12 w-full lg:mx-auto flex flex-col gap-2">
          <div className="pb-8 md:pl-0 pl-4">
            <p className="text-gray-600">
              Enter your new email address below to receive a verification link
              in the new email address.
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
              <ChangeEmailForm />
            </Suspense>
          </div>
        </section>
      </main>
    </Transition>
  );
}
