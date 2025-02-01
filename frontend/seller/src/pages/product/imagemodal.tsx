import { MouseEventHandler } from "react";
import CloseIcon from "../../components/icons/closeIcon";
import Modal from "../../components/modal";
import { ProductImages } from "../../utils/types";

interface Props {
  image: ProductImages;
  callback: () => void;
  name: string;
}

export default function ImageModal({ image, callback, name }: Props) {
  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    callback();
  };

  return (
    <Modal callback={callback}>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="relative">
          <div className="absolute -top-10 xl:-top-1 md:-top-10 md:-left-20 left-0">
            <button
              aria-label="Close modal"
              onClick={clickHanlder}
              className="block md:w-8 w-6 md:h-8 h-6 rounded-full bg-white"
            >
              <CloseIcon />
            </button>
          </div>
          <img
            src={`http://localhost:3020/${image.url}`}
            alt={name}
            className="md:w-600 w-80 md:h-600 h-300 mx-auto"
          />
        </div>
      </div>
    </Modal>
  );
}
