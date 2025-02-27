import { MouseEventHandler, useContext, useState } from "react";
import Modal from "../modal";
import CloseIcon from "../icons/closeIcon";
import { useMutation } from "@tanstack/react-query";
import { sendDeleteProduct } from "../../utils/mutations/products";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../loader";

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isIdle, mutate } = useMutation({
    mutationFn: sendDeleteProduct,
    onSuccess: () => {
      navigate("/products", { replace: true });
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const confirmClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(id);
  };

  const cancelClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(false);
  };

  const deleteClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  return (
    <>
      <button
        onClick={deleteClickHandler}
        className="bg-red-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
        aria-label="Delete Product"
      >
        Delete
      </button>
      {clicked && (
        <Modal callback={() => setClicked(false)}>
          <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
            <div className="w-full bg-white h-[300px] pt-10 relative">
              <h3 className="text-lg font-semibold text-center w-10/12 mx-auto">
                Are you sure you want to delete product <span>{name}</span>
              </h3>
              <div className="h-[100px] flex justify-center items-center">
                <div className="flex md:flex-row flex-col justify-center items-center md:gap-10 gap-6">
                  <button
                    aria-label="Go back to product"
                    onClick={cancelClickHandler}
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
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
