import { MouseEventHandler, useState } from "react";
import Modal from "../modal";
import CloseIcon from "../icons/closeIcon";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  image: string;
  alt: string;
  idx: number;
}

export default function ImageComponent({ image, alt, idx }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="w-32 h-32"
        onClick={clickHandler}
        aria-label={`Open image ${idx + 1}`}
      >
        <img
          src={`${apiProtocol}://${apiHost}/${image}`}
          alt={alt}
          className="w-32 h-32"
        />
      </button>
      {open && (
        <Modal callback={() => setOpen(false)}>
          <div className="h-screen md:w-600 w-350 mx-auto relative flex justify-center items-center">
            <div className="w-full bg-white h-500 relative md:pt-[50px] pt-[60px]">
              <div className="absolute xl:-left-[100px] md:-left-[70px] left-0 -top-[50px]">
                <button
                  aria-label="Go back to product"
                  onClick={clickHandler}
                  className="block w-6 h-6 bg-white rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>

              <img
                src={`http://localhost:3020/${image}`}
                alt={alt}
                className="md:w-9/12 w-full h-[400px]"
              />
              <div className="md:h-[50px] h-[40px] w-full bg-black flex items-center justify-center">
                <p className="text-center text-white xl:text-xl md:text-2xl text-base font-semibold">
                  Hazina
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
