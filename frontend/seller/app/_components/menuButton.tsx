"use client";
import { MouseEventHandler, useState } from "react";
import CloseIcon from "./closeIcon";
import MenuIcon from "./menuIcon";

const MenuButton = () => {
  const [clicked, setClicked] = useState(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(() => !clicked);
  };

  return (
    <button
      onClick={clickHandler}
      className="w-8 h-8 border border-black rounded-lg block"
    >
      <div className={clicked ? "hidden" : "block"}>
        <MenuIcon />
      </div>
      <div className={!clicked ? "hidden" : "block"}>
        <CloseIcon />
      </div>
    </button>
  );
};

export default MenuButton;
