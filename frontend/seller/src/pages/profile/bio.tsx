import { MouseEventHandler, useState } from "react";

interface Props {
  bio: string;
}

export default function ProfileBio({ bio }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHander: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  return (
    <div className="min-h-[250px] md:w-7/12 w-11/12 mx-auto">
      {bio.length > 200 ? (
        <>
          <p>{clicked ? `${bio.substring(0, 200)}...` : bio}</p>
          <button
            aria-label={clicked ? "Show less" : "Show more"}
            onClick={clickHander}
            className="text-sm underline"
          >
            {clicked ? "Less" : "More"}
          </button>
        </>
      ) : (
        <p>{bio}</p>
      )}
    </div>
  );
}
