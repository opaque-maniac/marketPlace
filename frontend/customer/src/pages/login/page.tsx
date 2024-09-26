import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "./layout";
import { useMutation } from "@tanstack/react-query";
import { sendLogin } from "../../utils/mutations/auth";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { FormEventHandler, useContext, useState } from "react";
import Loader from "../../components/loader";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { setAccessToken, setRefreshToken } from "../../utils/cookies";
import userStore from "../../utils/store";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [show, setShow] = useState<boolean>(false);
  const [, setError] = useContext(ErrorContext);
  const setUser = userStore((state) => state.setUser);
  const setCart = userStore((state) => state.setCart);
  const setWishlist = userStore((state) => state.setWishlist);

  const mutation = useMutation({
    mutationFn: sendLogin,
    onError: (error) => {
      try {
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
      } catch (e) {
        if (e instanceof Error) {
          setErr("Something unexpected happened");
        }
        navigate("/", { replace: true });
      }
    },
    onSuccess: (data) => {
      if (data) {
        setAccessToken(data.token);
        setRefreshToken(data.refreshToken);
        setUser(data.customer.id);
        setCart(data.cart);
        setWishlist(data.wishlist);
        navigate("/");
      } else {
        setErr("Something unexpected happened");
      }
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
              className="block bg-red-400 rounded-lg w-40 h-10 py-2"
              type="submit"
            >
              {mutation.isIdle ? "Log In" : <Loader color="#ffffff" />}
            </button>
            <Link to={"/forgot-password"} className="text-red-400">
              Forgot Password
            </Link>
          </div>
        </form>
        <div className="pt-4">
          <Link to={"/register"} className="underline">
            {"Don't have an account? Register"}
          </Link>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default LoginPage;
