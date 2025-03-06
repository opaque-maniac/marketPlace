import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "../../components/authlayout";
import { FormEventHandler, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRegister } from "../../utils/mutations/auth/register";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [show, setShow] = useState<boolean>(false);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: sendRegister,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ email, name, password });
  };

  return (
    <Transition>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign up to the Hazina seller app" />
        <meta name="robots" content="nofollow" />
        <meta name="googlebot" content="nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <AuthLayout page="Sign Up">
        <div className="mb-4">
          <h3 className="text-4xl mb-4">Create an account</h3>
          <p>Enter your details below</p>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center flex-col gap-2"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="block w-80 h-14 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
          </div>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="block w-80 h-14 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
          </div>
          <div className="flex justify-start items-center gap-1 border-b border-b-black/20">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              className="block w-72 h-14 px-2 text-lg focus:outline-none focus:border-none bg-white pr-1"
            />
            <button
              aria-label="Show Password"
              onClick={(e) => {
                e.preventDefault();
                setShow(() => !show);
              }}
              className="h-6 bg-transparent"
            >
              {show ? <EyeClosed /> : <EyeOpen />}
            </button>
          </div>
          <div className="pt-4 flex justify-center gap-4 items-center">
            <button
              aria-label="Send Login Details"
              className="flex justify-center items-center text-white bg-red-400 rounded-lg w-40 h-10"
              type="submit"
            >
              {mutation.isIdle ? (
                <span>Sign Up</span>
              ) : (
                <div className="w-6 h-6">
                  <Loader color="#fff" />{" "}
                </div>
              )}
            </button>
          </div>
        </form>
        <div className="pt-4 md:pb-4 lg:pb-0 pb-0">
          <Link
            to={"/login"}
            className="underline block lg:pb-0 md:pb-4 pb-0 text-center"
          >
            {"Have an account? Log in"}
          </Link>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default RegisterPage;
