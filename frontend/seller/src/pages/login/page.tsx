import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "./layout";
import { useMutation } from "@tanstack/react-query";
import { sendLogin } from "../../utils/mutations/auth";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { FormEventHandler, useContext, useState } from "react";
import Loader from "../../components/loader";
import ErrorContext from "../../utils/errorContext";
import { setAccessToken, setRefreshToken } from "../../utils/cookies";
import userStore from "../../utils/store";
import ShowError from "../../components/showErr";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";

const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [, setError] = useContext(ErrorContext);
  const setUser = userStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: sendLogin,
    onError: (error) => {
      const obj = JSON.parse(error.message) as ErrorResponse;
      const [show, url] = errorHandler(obj.errorCode);
      if (show) {
        setErr(obj.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        }
      }
    },
    onSuccess: (data) => {
      if (data) {
        setAccessToken(data.token);
        setRefreshToken(data.refreshToken);
        setUser(data.seller.id);
        console.log(data);
        navigate("/");
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

  const callback = () => {
    setErr(() => null);
  };

  return (
    <Transition>
      <AuthLayout page={"Log In"}>
        <div className="mb-4">
          <h3 className="text-4xl mb-4">Log in to Hazina</h3>
          <p>Enter your details below</p>
        </div>
        <div className="h-12">
          {err && <ShowError error={err} callback={callback} />}
        </div>
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center flex-col gap-4"
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
              className="block w-80 h-14 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              className="block w-80 h-14 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white pr-1"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShow(() => !show);
              }}
              className="absolute h-8 bg-transparent top-3 bottom-3 right-1"
            >
              {show ? <EyeClosed /> : <EyeOpen />}
            </button>
          </div>
          <div className="pt-4 flex justify-center gap-4 items-center">
            <button
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
