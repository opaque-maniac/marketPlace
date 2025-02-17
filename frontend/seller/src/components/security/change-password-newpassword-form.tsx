import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { ShowMessageContext } from "../../utils/errorContext";
import { sendResetPasswordNewPasswordForm } from "../../utils/mutations/security/sendresetpasswordnewpasswordform";

interface Props {
  token: string;
  error: () => void;
}

export default function ResetPasswordNewPasswordForm({ token, error }: Props) {
  const navigate = useNavigate();
  const [, setMessage] = useContext(ShowMessageContext);

  const form = useRef<HTMLFormElement | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetPasswordNewPasswordForm,
    onError: () => {
      form.current?.reset();
      error();
    },
    onSuccess: () => {
      setMessage("Password reset successfully");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      navigate("/login", { replace: true });
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    mutate({ password, token });
  };

  return (
    <form ref={form} onSubmit={submitHandler} className="w-64 mx-auto">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="New Password"
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
