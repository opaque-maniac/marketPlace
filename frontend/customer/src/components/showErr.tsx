import CloseIcon from "./icons/closeIcon";
import Transition from "./transition";

interface Props {
  error: string;
  callback: () => void;
}

const ShowError = ({ error, callback }: Props) => {
  return (
    <Transition>
      <div className="w-full h-12 flex justify-start items-center gap-2 bg-red-400 rounded-lg">
        <p
          aria-live="assertive"
          role="alert"
          className="text-white text-wrap w-10/12 px-1"
        >
          {error}
        </p>
        <button
          aria-label="Close Error"
          onClick={(e) => {
            e.preventDefault();
            callback();
          }}
          className="h-10 w-10"
        >
          <CloseIcon />
        </button>
      </div>
    </Transition>
  );
};

export default ShowError;
