import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { logoutFunc } from "../../utils/logout";
import Loader from "../loader";
import { sendDeleteProfile } from "../../utils/mutations/profile/deleteprofile";
import Modal from "../modal";
import CloseIcon from "../icons/closeIcon";

export default function ProfileDeleteButton() {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const [clicked, setClicked] = useState<boolean>(false);

  const { isPending, mutate } = useMutation({
    mutationFn: sendDeleteProfile,
    onSuccess: () => {
      logoutFunc(navigate, true);
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  const confirmHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <button
        aria-label="Delete profile"
        onClick={clickHanlder}
        className="flex justify-center items-center h-10 w-40 rounded-lg bg-red-500 text-white"
      >
        {isPending ? (
          <div className="w-6 h-6">
            <Loader color="#fff" />
          </div>
        ) : (
          <span>Delete Profile</span>
        )}
      </button>
      {clicked && (
        <Modal callback={() => setClicked((prev) => !prev)}>
          <div className="h-screen md:w-600 w-350 mx-auto flex justify-center items-center">
            <div className="w-full bg-white h-500 relative md:pt-[50px] pt-[60px]">
              <div className="md:w-9/12 w-11/12 h-[400px] mx-auto bg-white md:pt-8">
                <h3 className="text-center">
                  Are you sure you want to delete your profile?
                </h3>
                <div className="flex md:justify-around justify-start md:flex-row flex-col items-center md:gap-0 gap-4 mt-8">
                  <button
                    className="w-40 h-10 flex justify-center items-center bg-green-500 text-white rounded-md"
                    onClick={clickHanlder}
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    className="w-40 h-10 flex justify-center items-center bg-red-500 text-white rounded-md"
                    onClick={confirmHandler}
                  >
                    <span>Confirm</span>
                  </button>
                </div>
              </div>
              <div className="md:h-[50px] h-[40px] w-full bg-black flex items-center justify-center">
                <p className="text-center text-white xl:text-xl md:text-2xl text-base font-semibold">
                  Hazina
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
