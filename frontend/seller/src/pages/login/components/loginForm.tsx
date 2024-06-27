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
import submitLoginData from "./submitLogin";
import { useLoggedInStore } from "../../../utils/store";
import Loader from "../../../components/loader";
import { setSellerCookie } from "../../../utils/cookieStore";
import { useNavigate } from "react-router-dom";
import ValidationContext from "../../../utils/validationContext";

const LoginForm = () => {
  const [clicked, setCicked] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const login = useLoggedInStore((state) => state.login);
  const [, setValidationError] = useContext(ValidationContext);
  const navigate = useNavigate();

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCicked(!clicked);
  };

  const mutation = useMutation({
    mutationFn: submitLoginData,
    onSuccess: (data) => {
      console.log(data);
      if (data.seller && data.token) {
        login(data.seller.id);
        setSellerCookie(data.token);
        navigate("/products", { replace: true });
      }
    },
    onError: (error: { message: string }) => {
      setValidationError(error.message);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Invalid email or password");
      return;
    }

    mutation.mutate({ email, password });
  };

  if (mutation.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={submitHandler} className="w-400 md:mx-0 mx-auto">
      {error ? (
        <div className="w-full bg-red-500 text-white h-6">
          <p>{error}</p>
        </div>
      ) : null}
      <div className="mb-6 lg:w-350 md:w-300 w-8/12 mx-auto">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="block w-full h-full px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-black"
        />
      </div>
      <div className="mb-6 lg:w-350 md:w-300 w-8/12 mx-auto relative">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type={clicked ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          required
          className="block w-full h-full px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-black"
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
      <div>
        <button
          type="submit"
          className="block bg-gray-300 w-20 h-10 rounded shadow-lg mx-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-400 hover:text-white text-black transition duration-300 ease-in-out"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
