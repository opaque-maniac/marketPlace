import { MouseEvent, MouseEventHandler, useState } from "react";

interface Props {
  description: string;
}

export default function ProductDescription({ description }: Props) {
  const [show, setShow] = useState<boolean>(false);

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <div className="xl:w-10/12 w-auto">
      {description.length > 200 ? (
        <>
          <p>{show ? description : `${description.slice(0, 200)}...`}</p>
          <button
            aria-label={show ? "Show Less" : "Show More"}
            className="underline text-sm"
            onClick={clickHanlder}
          >
            {show ? "Less" : "More"}
          </button>
        </>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}
