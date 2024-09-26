import Transition from "./transition";

interface Props {
  message: string;
}

const SuccessComponent = ({ message }: Props) => {
  return (
    <Transition>
      <div className="fixed top-16 right-2 z-40 w-80 h-16 rounded-md bg-green-400 p-2 flex justify-start gap-1">
        <p className="w-11/12">{message}</p>
      </div>
    </Transition>
  );
};

export default SuccessComponent;
