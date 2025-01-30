import { useContext } from "react";
import CloseIcon from "./icons/closeIcon";
import Transition from "./transition";
import { ShowErrorContext } from "../utils/errorContext";

const ShowError = () => {
  const [error, setError] = useContext(ShowErrorContext);

  return (
    <>
      {error && (
        <Transition>
          <div className="w-56 h-12 flex justify-start items-center gap-2 bg-red-400 rounded-lg fixed top-16 right-4">
            <p
              aria-live="assertive"
              role="alert"
              className="text-white text-wrap"
            >
              {error}
            </p>
            <button
              aria-label="Close Error"
              onClick={(e) => {
                e.preventDefault();
                setError(null);
              }}
              className="h-10 w-10"
            >
              <CloseIcon />
            </button>
          </div>
        </Transition>
      )}
    </>
  );
};

export default ShowError;
