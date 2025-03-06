import { MouseEventHandler } from "react";
import CloseIcon from "../../components/icons/closeIcon";
import Modal from "../../components/modal";
import { CustomerImage, ProductImages, SellerImage } from "../../utils/types";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  image: ProductImages | CustomerImage | SellerImage;
  callback: () => void;
  name: string;
  show?: boolean;
}

export default function ImageModal({
  image,
  callback,
  name,
  show = false,
}: Props) {
  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    callback();
  };

  return (
    <Modal callback={callback}>
      <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
        <div className="w-full bg-white h-500 relative md:pt-[50px] pt-[60px]">
          <div className="absolute xl:-left-[100px] md:-left-[70px] left-0 -top-[50px]">
            <button
              aria-label="Go back to product"
              onClick={clickHanlder}
              className="block w-6 h-6 bg-white rounded-full"
            >
              <CloseIcon />
            </button>
          </div>

          <img
            src={`${apiProtocol}://${apiHost}/${image.url}`}
            alt={name}
            className="md:w-9/12 w-full h-[400px] mx-auto"
          />
          {show && (
            <div className="md:h-[50px] h-[40px] w-full bg-black flex items-center justify-center">
              <p className="text-center text-white xl:text-xl md:text-2xl text-base font-semibold">
                Hazina
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
