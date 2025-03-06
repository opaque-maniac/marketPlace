import { MouseEventHandler, useState } from "react";
import { apiHost, apiProtocol } from "../../utils/generics";
import { ProductImages } from "../../utils/types";
import ImageModal from "./imagemodal";

interface Props {
  image: ProductImages;
  name: string;
  idx: number;
}

export default function ProductImageButton({ image, name, idx }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  const callback = () => {
    setClicked((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={clickHanlder}
        aria-label={`View image ${idx + 1} for ${name}`}
        className="border w-170 h-138"
      >
        <img
          key={idx}
          src={`${apiProtocol}://${apiHost}/${image.url}`}
          alt={name}
          className="w-full h-full"
        />
      </button>
      {clicked && (
        <ImageModal image={image} callback={callback} name={name} show={true} />
      )}
    </>
  );
}
