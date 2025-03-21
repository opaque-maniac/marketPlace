import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "../../components/authlayout";
import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useContext, useState } from "react";
import Loader from "../../components/loader";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import {
  setAccessToken,
  setProfileImage,
  setRefreshToken,
} from "../../utils/cookies";
import userStore from "../../utils/store";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import { sendLogin } from "../../utils/mutations/auth/login";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

const LoginPage = () => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [show, setShow] = useState<boolean>(false);
  const [, setError] = useContext(ErrorContext);
  const setUser = userStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: sendLogin,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: (data) => {
      if (data) {
        setAccessToken(data.token);
        setRefreshToken(data.refreshToken);
        setUser(data.customer.id);
        setProfileImage(data.customer.image?.url || null);
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
      <MetaTags
        title="Log In | Hazina"
        description="Log in to Hazina"
        keywords={[
          "log in",
          "log in hazina",
          "log in account",
          "sign in",
          "sign in hazina",
          "sign in account",
        ]}
        image="/images/logo.svg"
        allowBots={true}
      />
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
              className="block bg-red-400 rounded-lg w-40 h-10 py-2 text-white"
              type="submit"
            >
              {mutation.isIdle ? "Log In" : <Loader color="#ffffff" />}
            </button>
            <Link to={"/reset-password"} className="text-red-400">
              Forgot Password
            </Link>
          </div>
        </form>
        <div className="pt-4 flex md:justify-start justify-center items-center">
          <Link to={"/register"} className="underline">
            {"Don't have an account? Register"}
          </Link>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default LoginPage;
