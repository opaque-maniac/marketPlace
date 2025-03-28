import { Link, useNavigate } from "react-router-dom";
import Transition from "../../components/transition";
import AuthLayout from "../login/layout";
import { FormEventHandler, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ROLE } from "../../utils/types";
import EyeClosed from "../../components/icons/hide";
import EyeOpen from "../../components/icons/show";
import Loader from "../../components/loader";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { sendRegister } from "../../utils/mutations/auth/register";
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
    onSuccess: (data) => {
      if (data && data.staff) {
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
    const role = formData.get("role") as ROLE;
    mutation.mutate({ email, firstName, lastName, password, role });
  };

  return (
    <Transition>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign up to the Hazina staff app" />
        <meta name="robots" content="nofollow, noindex" />
        <meta name="googlebot" content="nofollow, noindex" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <AuthLayout page="Sign Up">
        <div className="mb-4">
          <h3 className="text-3xl mb-4">Create a staff account</h3>
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
          <div>
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              name="role"
              id="role"
              required
              className="block w-80 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white focus:text-black text-gray-200"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="ADMIN">Admin</option>
              <option value="STAFF">Staff</option>
              <option value="MANAGER">Manager</option>
            </select>
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
          <div className="w-80 mx-auto pt-4">
            <p className="text-xs">
              By clicking <span className="font-semibold">Sign Up</span>, you
              have agreed to all of our{" "}
              <Link to={"/terms"} target="_blank" className="text-blue-500">
                Terms & Conditions
              </Link>
              .
            </p>
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
                  <Loader color="#ffffff" />{" "}
                </div>
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <Link
            className="inline-block mt-8 font-semibold underline"
            to={"/login"}
          >
            Sign In if you already have an account.
          </Link>
        </div>
        <div className="w-80 mx-auto mt-4 md:pb-0 pb-10">
          <span className="text-xs">
            Note that once you do, an email will be sent to an admin who will
            approve your account before you are able to use it
          </span>
        </div>
      </AuthLayout>
    </Transition>
  );
};

export default RegisterPage;
