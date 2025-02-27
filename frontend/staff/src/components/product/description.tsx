import { useState } from "react";

export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      {description.length < 200 ? (
        <p className="xl:w-10/12 w-full">{description}</p>
      ) : (
        <>
          <p className="xl:w-10/12 w-full mb-[2px]">
            {show ? description : `${description.slice(0, 200)}...`}
          </p>
          <button
            aria-label={show ? "Show Less" : "Show More"}
            className="underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              setShow(() => !show);
            }}
          >
            {show ? "Less" : "More"}
          </button>
        </>
      )}
    </div>
  );
}
