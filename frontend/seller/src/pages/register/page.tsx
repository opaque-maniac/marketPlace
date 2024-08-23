import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "../login/layout";
import { FormEventHandler, MouseEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRegister } from "../../utils/mutations/auth";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import CloseIcon from "../../components/icons/closeIcon";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: sendRegister,
    onError: (error) => {
      const obj = JSON.parse(error.message) as ErrorResponse;
      const show = errorHandler(obj.errorCode, navigate);
      if (show) {
        setErr(obj.message);
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

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setErr(null);
  };

  return (
    <Transition>
      <AuthLayout page="Sign Up">
        <div className="mb-4">
          <h3 className="text-4xl mb-4">Create an account</h3>
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
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="block w-80 h-14 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            />
          </div>
          <div className="pt-4 flex justify-center gap-4 items-center">
            <button
              className="block bg-red-400 rounded-lg w-40 h-10"
              type="submit"
            >
              Sign Up
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
