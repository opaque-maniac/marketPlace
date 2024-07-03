import {
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import EyeIcon from "./eyeIcon";
import EyeSlashIcon from "./eyeSlashIcon";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import submitRegisterData from "./submitRegister";
import Loader from "../../../components/loader";
import { useNavigate } from "react-router-dom";
import ValidationContext from "../../../utils/validationContext";
import ErrorContext from "../../../utils/errorContext";

const RegisterForm = () => {
  const [clicked, setCicked] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [, setValidationError] = useContext(ValidationContext);
  const [, setConError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCicked(!clicked);
  };

  const mutation = useMutation({
    mutationFn: submitRegisterData,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: { message: string }) => {
      if (error.message === "Something went wrong") {
        setConError(true);
        navigate("/error/500", { replace: true });
      } else {
        setValidationError(error.message);
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

    if (!email || !password) {
      setError("Invalid email or password");
      return;
    }

    mutation.mutate({ email, firstName, lastName, password });
  };

  if (mutation.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={submitHandler} className="" autoComplete="on" autoSave="on">
      {error ? (
        <div className="w-full bg-red-500 text-white h-6">
          <p>{error}</p>
        </div>
      ) : null}
      <div className="mb-6 lg:w-350 md:w-80 w-64 mx-auto">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="block lg:w-full md:w-80 w-64 h-full px-4 py-2 border-b bg-white focus:outline-none border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-80 w-64 mx-auto">
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          required
          className="block lg:w-full md:w-80 w-64 h-full px-4 py-2 border-b bg-white focus:outline-none border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-80 w-64 mx-auto">
        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          required
          className="block lg:w-full md:w-80 w-64 h-full px-4 py-2 border-b bg-white focus:outline-none border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-80 w-64 mx-auto relative">
        <label htmlFor="email" className="sr-only">
          Password
        </label>
        <input
          type={clicked ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          required
          className="block lg:w-full md:w-80 w-64 h-full px-4 py-2 border-b bg-white focus:outline-none border-black"
        />
        <button
          onClick={clickHanlder}
          className="block absolute w-5 h-5 right-2 top-2"
        >
          <div
            className={clsx({
              block: !clicked,
              hidden: clicked,
            })}
          >
            <EyeIcon />
          </div>
          <div
            className={clsx({
              hidden: !clicked,
              block: clicked,
            })}
          >
            <EyeSlashIcon />
          </div>
        </button>
      </div>
      <div className="flex justify-center items-center ">
        <button
          type="submit"
          className="block w-20 h-10 rounded shadow-lg mx-auto text-white bg-red-500 hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
