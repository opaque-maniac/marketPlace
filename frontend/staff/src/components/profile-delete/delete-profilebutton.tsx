import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { useMutation } from "@tanstack/react-query";
import { logoutFunction } from "../../utils/logout";
import Loader from "../loader";
import { deleteProfile } from "../../utils/mutations/profile/deleteprofile";

export default function DeleteProfileConfirmButton() {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProfile,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      logoutFunction(navigate, true);
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <button
      aria-label="Confirm deletion"
      onClick={clickHandler}
      className="flex w-40 h-10 justify-center items-center text-white bg-red-500"
    >
      {isPending ? (
        <div className="w-6 h-6">
          <Loader color="#fff" />
        </div>
      ) : (
        <span>Confirm</span>
      )}
    </button>
  );
}
