import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import MetaTags from "../../components/metacomponent";

export default function VerifyEmailConfirmationPage() {
  return (
    <Transition>
      <MetaTags
        title="Verify Email | Hazina"
        description="Verify your email address confirmation on Hazina"
        keywords={[
          "verify email confirmation",
          "verify email hazina confirmation",
          "verify email account confirmation",
          "verify email address confirmation",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
      <main role="main" className="h-full pt-20 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home /{" "}
          <span className="font-extrabold">Verification Confirmation</span>
        </p>

        <section className="md:w-8/12 w-full lg:mx-auto">
          <div className="pb-8 md:pl-0 pl-4">
            <h2 className="text-2xl font-bold text-center">
              Verify Your Email Address
            </h2>

            <p className="text-gray-600">
              We have sent you an email with a link to verify your email
              address. Please check your inbox and click on the link to verify
              your email address. If you do not receive the email within a few
              minutes, please check your spam folder. If you still do not
              receive the email, please contact us{" "}
              <Link to={"/contact"} className="undeline text-blue-500">
                here
              </Link>
              . It contains a link that you need to click to verify your email
              address. The link will expire in 10 minutes. If you do not verify
              your email address within 10 minutes, you will need to request a
              new verification email.
            </p>

            <div>
              <Link
                to={"/verify-email"}
                className="block w-52 h-12 bg-blue-500 text-white rounded-md text-center mt-4 pt-2 mx-auto"
              >
                Resend Verification Email
              </Link>
            </div>

            <p className="text-gray-600">
              If you have any questions, please contact us{" "}
              <Link to={"/contact"} className="undeline text-blue-500">
                here
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </Transition>
  );
}
