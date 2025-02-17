import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";
import { sendResetPasswordEmailForm } from "../../utils/mutations/security/sendresetpasswordemailform";

export default function ResetPasswordEmailForm() {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const form = useRef<HTMLFormElement | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetPasswordEmailForm,
    onError: (error) => {
      form.current?.reset();
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      navigate("/reset-confirm");
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    mutate(email);
  };

  return (
    <form ref={form} onSubmit={submitHandler} className="w-64 mx-auto">
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
          className="block w-60 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          aria-label="Submit"
          className="flex justify-center items-center w-40 h-12 bg-blue-500 text-white rounded-md text-center mt-4 mx-auto"
        >
          {isPending ? (
            <div className="w-8 h-8">
              <Loader color="#fff" />
            </div>
          ) : (
            <span>Verify Email</span>
          )}
        </button>
      </div>
    </form>
  );
}
