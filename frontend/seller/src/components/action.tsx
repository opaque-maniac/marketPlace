import React, { useState } from "react";
import { useLoggedInStore } from "../utils/store";
import CloseIcon from "./icons/closeIcon";
import MenuIcon from "./icons/menuIcon";
import MobileNav from "./mobileNavbar";

const ActionFeature = () => {
  const user = useLoggedInStore((state) => state.user);
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHandler = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      {user ? (
        <div className="md:block hidden">
          <h1>Action Feature</h1>
        </div>
      ) : null}
      <div className="md:hidden block">
        <button onClick={clickHandler}>
          <div className={clicked ? "hidden" : "block"}>
            <MenuIcon />
          </div>
          <div className={clicked ? "block" : "hidden"}>
            <CloseIcon />
          </div>
        </button>
      </div>
      <MobileNav clicked={clicked} setClicked={setClicked} />
    </div>
  );
};

export default ActionFeature;
