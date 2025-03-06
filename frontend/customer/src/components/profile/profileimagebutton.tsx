import { MouseEventHandler, useState } from "react";
import { apiHost, apiProtocol } from "../../utils/generics";
import { CustomerImage } from "../../utils/types";
import ImageModal from "../product/imagemodal";

interface Props {
  image: CustomerImage | null;
  name: string;
}

export default function ProfileImageButton({ image, name }: Props) {
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
        onClick={clickHanlder}
        className="block w-80 h-80"
        aria-label={image ? "View image for profile" : "No image for profile"}
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
