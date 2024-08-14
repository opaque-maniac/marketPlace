"use client";
import CloseIcon from "@/app/_components/closeIcon";
import { sendRegister } from "@/utils/authMutations";
import { authErrorHandler } from "@/utils/errorHandler";
import { ErrorObj } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEventHandler, MouseEventHandler, useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: sendRegister,
    onSuccess: () => {
      redirect("/login");
    },
    onError: (error: Error) => {
      const errorMsg = error.message;
      const errorObj = JSON.parse(errorMsg.split(" ")[1]) as ErrorObj;
      if (typeof errorObj === "object") {
        if (errorObj.status === 401) {
          setError(errorObj.response.message);
        } else if (errorObj.status === 403) {
          authErrorHandler(errorObj.response.message);
        } else {
          setError("An error occured, please try again later");
        }
      }
    },
  });

  const submitHanlder: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ email, name, password });
  };

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <div>
      <div className="md:w-72 w-10/12 mx-auto md:mt-0 mt-4">
        <h2 className="text-2xl text-center font-semibold">Sign Up</h2>
        <p className="text-center w-10/12 mx-auto">
          Sign up to Hazina to start selling products on our platform.
        </p>
      </div>
      <div className="h-10">
        <div
          className={`md:w-72 w-10/12 text-white text-xl text-center py-4 rounded-lg bg-red-400 flex justify-center items-center gap-2 ${
            error ? "block" : "hidden"
          }`}
        >
          <p className="text-wrap w-10/12">{error ? error : null}</p>
          <button onClick={clickHandler} className="h-8 text-white rounded-lg">
            <CloseIcon />
          </button>
        </div>
      </div>
      <form
        onSubmit={submitHanlder}
        className="md:w-auto w-10/12 mx-auto md:mx-0 mt-8"
      >
        <div className="mb-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            className="md:w-72 w-full"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            className="md:w-72 w-full"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            className="md:w-72 w-full"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-4 md:w-72 w-full">
          <button
            type="submit"
            className="block border border-black text-center mx-auto w-20 h-10 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div>
        <Link
          className="text-center block mt-4 text-blue-500"
          href={"/login"}
        >{`Already have an account, sign in instead!`}</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
