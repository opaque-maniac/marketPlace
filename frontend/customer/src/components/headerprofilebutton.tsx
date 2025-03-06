import { MouseEventHandler, useState } from "react";
import ProfileIcon from "./icons/profileIcon";
import ProfileMenu from "./profilemenu";

export default function HeaderProfileButton() {
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  return (
    <>
      <button
        aria-label="Go open profile menu"
        onClick={clickHandler}
        className="w-full h-full bg-red-400 rounded-full p-1"
      >
        <ProfileIcon />
      </button>
      {clicked && <ProfileMenu callback={() => setClicked(() => false)} />}
    </>
  );
}
