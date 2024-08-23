import CloseIcon from "./icons/closeIcon";
import Transition from "./transition";

interface Props {
  error: string;
  callback: () => void;
}

const ShowError = ({ error, callback }: Props) => {
  return (
    <Transition>
      <div className="w-56 h-12 flex justify-start items-center gap-2">
        <p className="text-white text-wrap">{error}</p>
        <button
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
