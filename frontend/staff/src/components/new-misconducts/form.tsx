import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useContext } from "react";
import Loader from "../loader";
import { sendNewMisconduct } from "../../utils/mutations/misconducts/new-misconducts";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

export default function NewMisconductForm() {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: sendNewMisconduct,
    onSuccess: (data) => {
      navigate(`/misconducts/${data.misconduct.id}`, { replace: true });
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const misconduct = formData.get("misconduct") as string;
    const action = formData.get("action") as string;
    const description = formData.get("description") as string;
    mutate({ email, misconduct, action, description });
  };

  return (
    <form onSubmit={submitHandler} className="w-full">
      <div>
        <label htmlFor="email" className="sr-only">
          {"User's Email"}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="User Email"
          className="block mx-auto border-b border-black/50 focus:ring-0 focus:outline-none h-10 w-72 p-[5px]"
          required
        />
      </div>
      <div className="mt-5">
        <label htmlFor="misconduct" className="sr-only">
          Misconduct
        </label>
        <input
          type="text"
          name="misconduct"
          id="misconduct"
          className="block mx-auto border-b border-black/50 focus:ring-0 focus:outline-none h-10 w-72 p-[5px]"
          placeholder="Misconduct"
          required
        />
      </div>
      <div className="mt-5">
        <label htmlFor="action" className="sr-only">
          Action to take
        </label>
        <select
          name="action"
          className="block mx-auto border-b border-black/50 focus:ring-0 focus:outline-none h-10 w-72 p-[5px]"
          required
        >
          <option value={"WARN_USER"}>WARN USER</option>
          <option value={"DISABLE_PROFILE"}>DISABLE PROFILE</option>
          <option value={"DELETE_PROFILE"}>DELETE PROFILE</option>
        </select>
      </div>
      <div className="mt-5">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="block mx-auto border border-black/50 h-40 w-72 p-[5px] focus:ring-0 focus:outline-none"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="w-72 mx-auto flex justify-end items-center mt-3">
        <button
          type="submit"
          className="flex justify-center items-center w-40 h-10 bg-red-500 text-white"
        >
          {isPending ? (
            <div className="w-6 h-6">
              <Loader color="#fff" />
            </div>
          ) : (
            <span>Send</span>
          )}
        </button>
      </div>
    </form>
  );
}
