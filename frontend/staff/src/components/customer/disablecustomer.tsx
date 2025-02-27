import { MouseEventHandler, useContext, useState } from "react";
import Modal from "../modal";
import { useMutation } from "@tanstack/react-query";
import Loader from "../loader";
import { disableCustomer } from "../../utils/mutations/customers/disablecustomer";
import { errorHandler } from "../../utils/errorHandler";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";

interface Props {
  firstName: string;
  lastName: string;
  id: string;
}

export default function DisableCustomer({ id, firstName, lastName }: Props) {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [clicked, setClicked] = useState<boolean>(false);
  const [isAdmin] = useState<boolean>(true);

  const { isIdle, mutate } = useMutation({
    mutationFn: disableCustomer,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      // refetch
      setClicked(false);
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  const confirmClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <>
      <button
        aria-label="Disable customer"
        onClick={clickHandler}
        className="flex justify-center items-center w-40 h-10 bg-red-500 text-white rounded"
      >
        <span>Disable</span>
      </button>
      {clicked && (
        <Modal callback={() => setClicked(false)}>
          <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
            <div className="w-full bg-white md:h-[300px] h-[350px] pt-10 relative">
              <h3 className="text-lg font-semibold text-center w-10/12 mx-auto">
                Are you sure you want to disable the profile of{" "}
                <span>
                  {firstName} {lastName}
                </span>
              </h3>
              <div className="h-[100px] flex justify-center items-center mt-8">
                <div className="flex md:flex-row flex-col justify-center items-center md:gap-10 gap-6">
                  <button
                    aria-label="Go back to customer"
                    onClick={clickHandler}
                    className="bg-green-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
                  >
                    Go back
                  </button>
                  <button
                    aria-label="Confirm deletion"
                    onClick={confirmClickHandler}
                    disabled={!isIdle}
                    className="bg-red-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
                  >
                    {isIdle ? (
                      <span>Confirm</span>
                    ) : (
                      <div className="w-6 h-6">
                        <Loader color="#fff" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
              {isAdmin && (
                <div className="flex justify-center items-center md:mt-0 mt-10">
                  <Link
                    aria-label="Delete customer instead"
                    to={`/customers/${id}/delete`}
                    className="underline font-semibold"
                  >
                    Delete profile instead
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
