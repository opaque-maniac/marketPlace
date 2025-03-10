import { useMutation } from "@tanstack/react-query";
import { FormEventHandler, useContext, useState } from "react";
import Loader from "../loader";
import { sendNewMisconduct } from "../../utils/mutations/misconducts/new-misconducts";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  email: string;
  id: string;
  type: "customer" | "seller" | "staff";
}

interface InputProps {
  email: string;
  type: string;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

function RadioInput({ email, type, selectedType, setSelectedType }: InputProps) {
  const isSelected = selectedType === type;

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedType(type);
  };

  return (
    <button
      onClick={clickHandler}
      aria-label={`Select ${type} profile${type === "all" ? "" : "s"}`}
      className={`block text-start h-[100px] border border-black/20 p-[5px] w-72 mx-auto ${
        isSelected ? "bg-blue-100" : "bg-gray-50"
      }`}
    >
      <input
        type="radio"
        id={type}
        name="profile-type"
        value={type === "all" ? "" : type}
        className="mr-2"
        checked={isSelected}
        onChange={() => setSelectedType(type)}
        required
      />
      <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
      <p className="text-xs">
        Link this misconduct to all {type} profiles with the email address{" "}
        <span className="font-semibold">{email}</span>
      </p>
    </button>
  );
}

export default function NewMisconductForm({ email, id, type }: Props) {
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

  const [selectedType, setSelectedType] = useState<string>("all");

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email") as string,
      misconduct: formData.get("misconduct") as string,
      action: formData.get("action") as string,
      description: formData.get("description") as string,
      id,
      role: formData.get("profile-type") as "customer" | "seller" | "staff",
    };

    mutate(payload);
  };

  const types = ["all", "customer", "seller", "staff"];

  return (
    <form onSubmit={submitHandler} className="w-full h-full">
      <div>
        <label htmlFor="email" className="sr-only">
          {"User's Email"}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          readOnly
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
        <p className="w-72 mx-auto text-sm mt-2 mb-1">Please select profile to attack to this complaint</p>
      <div className="flex flex-col gap-[10px]">
        {types
          .filter((tp) => tp === "all" || tp === type)
          .map((tp, idx) => (
            <RadioInput
              key={idx}
              email={email}
              type={tp}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          ))}
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

