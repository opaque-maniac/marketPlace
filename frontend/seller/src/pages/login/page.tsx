import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "./layout";
import { useMutation } from "@tanstack/react-query";
import { sendLogin } from "../../utils/mutations/auth";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import {
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import CloseIcon from "../../components/icons/closeIcon";
import Loader from "../../components/loader";
import ErrorContext from "../../utils/errorContext";
import { setAccessToken, setRefreshToken } from "../../utils/cookies";
import userStore from "../../utils/store";

const LoginPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [, setError] = useContext(ErrorContext);
  const setUser = userStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: sendLogin,
    onError: (error) => {
      const obj = JSON.parse(error.message) as ErrorResponse;
      const show = errorHandler(obj.errorCode, navigate);
      if (show) {
        setErr(obj.message);
      }
    },
    onSuccess: (data) => {
      if (data && data.token && data.refreshToken && data.user) {
        setAccessToken(data.token);
        setRefreshToken(data.refreshToken);
        setUser(data.user.id);
        navigate("/");
      } else {
        setError(true);
        navigate("/500");
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

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setErr(null);
  };

  return (
    <Transition>
      <AuthLayout page={"Log In"}>
        <div className="mb-4">
          <h3 className="text-4xl mb-4">Log in to Hazina</h3>
          <p>Enter your details below</p>
        </div>
        <div className="h-12">
          {err && (
            <div className="w-full h-10 bg-red-400 flex justify-start items-center gap-1">
              <p className="text-white text-center">{err}</p>
              <button onClick={clickHandler} className="h-8 w-8">
                <CloseIcon />
              </button>
            </div>
          )}
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
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="block w-80 h-14 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
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
