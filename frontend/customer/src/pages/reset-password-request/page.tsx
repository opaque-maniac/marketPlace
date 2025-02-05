import { FormEventHandler, useContext, useRef } from "react";
import Transition from "../../components/transition";
import { useMutation } from "@tanstack/react-query";
import { passwordResetTokenRequest } from "../../utils/mutations/security/passwordresetrequest";
import { errorHandler } from "../../utils/errorHandler";
import { Link, useNavigate } from "react-router-dom";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "../../utils/errorContext";
import Loader from "../../components/loader";

export default function ResetPasswordRequestPage() {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setMessage] = useContext(ShowMessageContext);

  const form = useRef<HTMLFormElement | null>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: passwordResetTokenRequest,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      setMessage("Email has been sent");
      form.current?.reset();
      setTimeout(() => {
        setMessage(null);
      }, 10000);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    mutate(email);
  };

  return (
    <Transition>
      <main role="main" className="relative pt-14">
        <p className="absolute top-4 left-4">
          Home / <span className="font-extrabold">Reset Password</span>
        </p>

        <section className="md:w-8/12 w-full mx-auto">
          <div>
            <h3 className="text-2xl font-semibold text-center">
              Reset Password
            </h3>
          </div>
          <div>
            <p className="text-center text-gray-500 mt-2">
              Please enter your email address to reset your password
            </p>
          </div>
          <div className="mt-6">
            <form className="w-ful" onSubmit={submitHandler} ref={form}>
              <div className="w-full">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-72 block border border-gray-300 rounded-md px-3 py-2 mt-1 mx-auto"
                  required
                />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  aria-label="Reset Password"
                  title="Reset Password"
                  disabled={isPending}
                  className="w-40 h-10 bg-blue-500 text-white rounded-md px-3 py-2 mt-4 mx-auto flex justify-center items-center"
                >
                  {isPending ? (
                    <Loader color="white" />
                  ) : (
                    <span>Reset Password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <div className="w-full flex justify-center items-center pt-8">
          <Link className="underline" to={"/login"}>
            Go back to login page
          </Link>
        </div>
      </main>
    </Transition>
  );
}
