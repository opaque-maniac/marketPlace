import { useMutation } from "@tanstack/react-query";
import EmailIcon from "../../components/icons/email";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader";
import { passwordChangeTokenRequest } from "../../utils/mutations/security/passwordchangerequest";

export default function EmailChangeButton() {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setMessage] = useContext(ShowMessageContext);

  const { isPending, mutate } = useMutation({
    mutationFn: passwordChangeTokenRequest,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      setMessage("Sent verification email, check inbox");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="pt-4">
      <button
        aria-label="Request email"
        className="bg-blue-500 flex justify-center items-center w-40 h-11 rounded text-white gap-2 mx-auto"
        disabled={isPending}
        onClick={clickHandler}
      >
        <span>Request</span>
        <div className="h-6 w-6">
          {isPending ? <Loader color="#fff" /> : <EmailIcon />}
        </div>
      </button>
    </div>
  );
}
