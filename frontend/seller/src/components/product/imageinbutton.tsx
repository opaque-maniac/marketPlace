import { MouseEventHandler, useState } from "react";
import { ProductImages } from "../../utils/types";
import ImageModal from "./imagemodal";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  image: ProductImages;
  name: string;
}

export default function LivelyImage({ image, name }: Props) {
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
      <button onClick={clickHanlder}>
        <img
          src={`${apiProtocol}://${apiHost}/${image.url}`}
          alt={name}
          className="w-32 h-32"
        />
      </button>
      {clicked && <ImageModal image={image} callback={callback} name={name} />}
    </>
  );
}
