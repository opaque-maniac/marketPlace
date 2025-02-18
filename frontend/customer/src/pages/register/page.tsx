import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "../../components/authlayout";
import { FormEventHandler, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import Loader from "../../components/loader";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { sendRegister } from "../../utils/mutations/auth/register";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

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
    onSuccess: (data) => {
      if (data && data.customer) {
        navigate("/verify-confirm");
      } else {
        setErr("Something unexpected happened");
      }
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ email, firstName, lastName, password });
  };

  return (
    <Transition>
      <MetaTags
        title="Sign Up | Hazina"
        description="Create an account with Hazina"
        keywords={[
          "sign up",
          "sign up hazina",
          "sign up account",
          "register",
          "register hazina",
          "register account",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
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
              required
              className="block w-80 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
              className="block w-80 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
              className="block w-80 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
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
              className="block w-72 h-12 px-2 text-lg focus:outline-none focus:border-none bg-white pr-1"
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
              className="block bg-red-400 rounded-lg w-40 h-10 py-2 text-white"
              type="submit"
            >
              {mutation.isIdle ? "Sign Up" : <Loader color="#ffffff" />}
            </button>
          </div>
        </form>
        <div className="pt-4 flex md:justify-start justify-center items-center">
          <Link to={"/login"} className="underline">
            {"Have an account? Log in"}
          </Link>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default RegisterPage;
