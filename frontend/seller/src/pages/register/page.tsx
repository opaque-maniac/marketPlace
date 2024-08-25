import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "../login/layout";
import { FormEventHandler, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRegister } from "../../utils/mutations/auth";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import ShowError from "../../components/showErr";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import Loader from "../../components/loader";
import ErrorContext from "../../utils/errorContext";
import { Helmet } from "react-helmet";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: sendRegister,
    onError: (error) => {
      const errorObj = JSON.parse(error.message) as ErrorResponse;
      const [show, url] = errorHandler(errorObj.errorCode);

      if (show) {
        setErr(errorObj.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url, { replace: true });
        } else {
          setError(true);
          navigate("/500", { replace: true });
        }
      }
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

  const callback = () => {
    setErr(() => null);
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
        <div className="h-12">
          {err && <ShowError error={err} callback={callback} />}
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
              className="block bg-red-400 rounded-lg w-40 h-10"
              type="submit"
            >
              {mutation.isIdle ? "Sign Up" : <Loader color="#ffffff" />}
            </button>
          </div>
        </form>
        <div className="pt-4">
          <Link to={"/login"} className="underline">
            {"Have an account? Log in"}
          </Link>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default RegisterPage;
