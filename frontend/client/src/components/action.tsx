import { MouseEventHandler, useEffect, useState } from "react";
import { useLoggedInStore } from "../utils/store";
import CloseIcon from "./icons/closeIcon";
import MenuIcon from "./icons/menuIcon";
import MobileNav from "./mobileNavbar";
import ProfileIcon from "./icons/profileIcon";
import { Link } from "react-router-dom";
import CartIcon from "./icons/cartIcon";
import HeartIcon from "./icons/Heart";
import SearchForm from "./searchForm";
import ActionNav from "./actionNav";

const ActionFeature = () => {
  const user = true; // useLoggedInStore((state) => state.user);
  const cart = useLoggedInStore((state) => state.cart);
  const favorites = useLoggedInStore((state) => state.favorites);
  const [clicked, setClicked] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setClicked(!clicked);
  };

  const actionClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setHover(!hover);
  };

  const actionLinkClick: MouseEventHandler<HTMLAnchorElement> = () => {
    setHover(false);
  };

  return (
    <div>
      <div className="flex items-center justify-start lg:gap-4 md:gap-3 gap-4 w-4/12">
        <div className="md:block hidden">
          <SearchForm />
        </div>
        {user ? (
          <>
            <div className="md:block hidden">
              <Link
                to={"/login"}
                className="block lg:w-6 lg:h-6 md:w-8 md:h-8 w-5 h-5 relative"
              >
                <HeartIcon />
                <div
                  className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 -right-1 flex justify-center items-center"
                  style={{ paddingTop: "2px" }}
                >
                  <span>{favorites ?? 0}</span>
                </div>
              </Link>
            </div>
            <div className="md:block hidden">
              <Link
                to={"/login"}
                className="block lg:w-6 lg:h-6 md:w-8 md:h-8 w-5 h-5 relative"
              >
                <CartIcon />
                <div
                  className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 -right-1 flex justify-center items-center"
                  style={{ paddingTop: "2px" }}
                >
                  <span>{cart ?? 0}</span>
                </div>
              </Link>
            </div>
          </>
        ) : null}
        {user ? (
          <div className="md:block hidden">
            <div>
              <button
                onClick={actionClickHandler}
                className="flex justify-center items-center rounded-full bg-red-400 p-1"
                style={{ height: "2.5rem", width: "2.5rem" }}
              >
                <ProfileIcon />
              </button>
            </div>
            {hover ? (
              <div className="fixed z-40 top-12 lg:right-28 md:right-2 bg-gradient-to-tr from-gray-500 to-blue-200 w-48 h-38 rounded shadow-lg flex items-center justify-start pl-2 py-2">
                <ActionNav actionLinkClick={actionLinkClick} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="md:hidden flex justify-end gap-4">
        {user ? (
          <>
            <div className="md:hidden block">
              <Link to={"/login"} className="block w-7 h-7 relative">
                <HeartIcon />
                <div
                  className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 -right-1 flex justify-center items-center"
                  style={{ paddingTop: "2px" }}
                >
                  <span>{favorites ?? 0}</span>
                </div>
              </Link>
            </div>
            <div className="block md:hidden">
              <Link to={"/login"} className="block w-7 h-7 relative">
                <CartIcon />
                <div
                  className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 -right-1 flex justify-center items-center"
                  style={{ paddingTop: "2px" }}
                >
                  <span>{cart ?? 0}</span>
                </div>
              </Link>
            </div>
          </>
        ) : null}
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
