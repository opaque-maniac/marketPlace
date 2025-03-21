import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "./layout";
import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useContext, useState } from "react";
import Loader from "../../components/loader";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import {
  setAccessToken,
  setRefreshToken,
  setStaffRole,
  setUserID,
} from "../../utils/cookies";
import userStore from "../../utils/store";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import { Helmet } from "react-helmet";
import { sendLogin } from "../../utils/mutations/auth/login";
import { errorHandler } from "../../utils/errorHandler";

const LoginPage = () => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [show, setShow] = useState<boolean>(false);
  const [, setError] = useContext(ErrorContext);
  const setUser = userStore((state) => state.setUser);
  const setRole = userStore((state) => state.setRole);

  const mutation = useMutation({
    mutationFn: sendLogin,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: (data) => {
      if (!data) {
        setErr("Something unexpected happened");
        return;
      }

      setAccessToken(data.token);
      setRefreshToken(data.refreshToken);
      setUserID(data.staff.id);
      setUser(data.staff.id);
      setStaffRole(data.staff.role);
      setRole(data.staff.role);
      navigate("/products", { replace: true });
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ email, password });
  };

  return (
    <Transition>
      <Helmet>
        <title>Log In</title>
        <meta name="description" content="Log in to the Hazina seller app" />
        <meta name="robots" content="nofollow" />
        <meta name="googlebots" content="nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <AuthLayout page={"Log In"}>
        <div className="mb-4">
          <h3 className="text-4xl mb-4">Log in to Hazina</h3>
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
              aria-label="Send Register Details"
              className="flex justify-center text-white items-center bg-red-400 rounded-lg w-40 h-10"
              type="submit"
            >
              {mutation.isIdle ? (
                <span>Log In</span>
              ) : (
                <div className="w-6 h-6">
                  <Loader color="#ffffff" />{" "}
                </div>
              )}
            </button>
            <Link to={"/forgot-password"} className="text-red-400">
              Forgot Password
            </Link>
          </div>
        </form>
        <div className="flex justify-center">
          <Link
            to={"/register"}
            className="font-semibold underline text-black inline-block mt-8"
          >
            Sign Up for an account instead.
          </Link>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default LoginPage;
