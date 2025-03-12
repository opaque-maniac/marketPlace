import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { deleteMisconduct } from "../../utils/mutations/misconducts/deletemisconducts";
import Modal from "../modal";
import useUserStore from "../../utils/store";
import Loader from "../loader";

interface Props {
  id: string;
  staffID: string | null;
}

export default function DeleteMisconductButton({ id, staffID }: Props) {
  const user = useUserStore((state) => state.user);
  const isAdmin = useUserStore((state) => state.role) === "ADMIN";

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [clicked, setClicked] = useState<boolean>(false);

  const { isPending, mutate } = useMutation({
    mutationFn: deleteMisconduct,
    onSuccess: () => {
      navigate("/misconducts", { replace: true });
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const callback = () => {
    setClicked(false);
  };

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  const onConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(id);
  };

  const disable = user === staffID ? (isAdmin ? false : true) : false;

  return (
    <>
      <button
        onClick={onclick}
        aria-label="Delete misconduct"
        disabled={disable}
        className="flex justify-center items-center bg-red-500 text-white h-10 w-36 rounded-md"
      >
        <span>Delete Misconduct</span>
      </button>
      {clicked && (
        <Modal callback={callback}>
          <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
            <div className="w-full bg-white h-[300px] relative md:pt-[50px] pt-10">
              <h3 className="text-lg text-center">
                Are you sure you want to delete this complaint?
              </h3>
              <div className="mt-10 flex md:flex-row flex-col md:justify-around justify-start items-center md:gap-0 gap-4">
                <button
                  aria-label="Confirm"
                  disabled={isPending || disable}
                  className="w-36 h-10 bg-red-500 text-white rounded-md flex justify-center items-center"
                  onClick={onConfirm}
                >
                  {isPending ? (
                    <div className="w-6 h-6">
                      <Loader color="#fff" />
                    </div>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
                <button
                  aria-label="Cancel"
                  className="w-36 h-10 bg-blue-500 text-white rounded-md"
                  onClick={callback}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
