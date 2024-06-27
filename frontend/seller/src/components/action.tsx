import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { useLoggedInStore } from "../utils/store";
import CloseIcon from "./icons/closeIcon";
import MenuIcon from "./icons/menuIcon";
import MobileNav from "./mobileNavbar";
import ProfileIcon from "./icons/profileIcon";
import { Link } from "react-router-dom";
import SmallProfileIcon from "./icons/SmallProfile";
import LogoutIcon from "./icons/Logout";

const ActionFeature = () => {
  const user = useLoggedInStore((state) => state.user);
  const [clicked, setClicked] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setClicked(!clicked);
  };

  const actionClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setHover(!hover);
  };

  return (
    <div>
      {user ? (
        <div className="md:block hidden">
          <div>
            <button onClick={actionClickHandler}>
              <ProfileIcon />
            </button>
          </div>
          {hover ? (
            <div className="fixed z-40 top-12 bg-gradient-to-tr from-gray-500 to-blue-200 w-40 h-20 rounded shadow-lg flex items-center justify-start pl-2">
              <ul>
                <li className="mb-2">
                  <Link to={"/profile"} className="flex justify-start gap-4">
                    <div>
                      <SmallProfileIcon />
                    </div>
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/logout"} className="flex justify-start gap-4">
                    <div>
                      <LogoutIcon />
                    </div>
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
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
