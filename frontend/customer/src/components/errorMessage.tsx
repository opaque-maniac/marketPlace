import { MouseEventHandler, useContext } from "react";
import { ShowErrorContext } from "../utils/errorContext";
import Transition from "./transition";
import CloseIcon from "./icons/closeIcon";

const ErrorMessageComponent = () => {
  const [err, setErr] = useContext(ShowErrorContext);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setErr(null);
  };

  return (
    <>
      {err && (
        <Transition>
          <div className="fixed top-16 right-2 z-40 w-80 h-16 rounded-md bg-red-400 p-2 flex justify-start gap-1">
            <p className="w-11/12">{err}</p>
            <div>
              <button
                onClick={clickHandler}
                className="w-8 h-8 border border-black rounded-full"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </Transition>
      )}
    </>
  );
};

export default ErrorMessageComponent;
