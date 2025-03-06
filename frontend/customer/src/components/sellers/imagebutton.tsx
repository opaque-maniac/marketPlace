import { MouseEventHandler, useState } from "react";
import { apiHost, apiProtocol } from "../../utils/generics";
import { SellerImage } from "../../utils/types";
import ImageModal from "../product/imagemodal";

interface Props {
  image?: SellerImage;
  name: string;
}

export default function SellerImageButton({ image, name }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (image) {
      setClicked((prev) => !prev);
    }
  };

  const callback = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <button
        aria-label={
          image
            ? `View image for seller ${name}`
            : `No image for seller ${name}`
        }
        onClick={clickHanlder}
        className="w-40 h-40 block"
      >
        <img
          src={
            image
              ? `${apiProtocol}://${apiHost}/${image.url}`
              : "/images/profile.svg"
          }
          alt={name}
          className="w-full h-full"
        />
      </button>
      {clicked && image ? (
        <ImageModal name={name} image={image} callback={callback} />
      ) : null}
    </>
  );
}
