import { MouseEventHandler, useContext } from "react";
import Transition from "./transition";
import { ShowMessageContext } from "../utils/errorContext";
import CloseIcon from "./icons/closeIcon";

const GeneralMessageComponent = () => {
  const [message, setMessage] = useContext(ShowMessageContext);

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setMessage(null);
  };

  return (
    <>
      {message && (
        <Transition>
          <div className="fixed top-16 right-2 z-40 w-80 min-h-16 rounded-md bg-green-400 px-2 flex justify-between gap-1">
            <div className="min-h-14 py-1">
              <p className="w-full">{message}</p>
            </div>
            <div className="w-1/12 h-16 flex justify-start items-center">
              <button
                onClick={clickHanlder}
                aria-label="Close message"
                className="block h-[25px] w-[25px] border border-black rounded-full"
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

export default GeneralMessageComponent;
