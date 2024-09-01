import { useNavigate } from "react-router-dom";
import useUserStore from "../utils/store";
import CartIcon from "./icons/cart";
import HeartIcon from "./icons/heart";
import ProfileIcon from "./icons/profileIcon";
import SearchForm from "./searchform";
import { MouseEventHandler, useState } from "react";
import ProfileMenu from "./profilemenu";

const Action = () => {
  const user = useUserStore((state) => state.user);
  const cart = useUserStore((state) => state.cart);
  const wishlist = useUserStore((state) => state.wishlit);
  const [clicked, setClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(() => !clicked);
  };

  return (
    <div className="flex justify-start items-center gap-4">
      <div className="lg:w-300 w-200 md:block hidden">
        <SearchForm />
      </div>
      {user && (
        <>
          <div className="flex justify-start items-center gap-4 h-14">
            <div>
              <button
                aria-label="Go to the cart page"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/cart");
                }}
                className="w-6 h-6 rounded-full relative"
              >
                <div className="absolute bg-red-400 h-4 w-4 -top-1  rounded-full -right-2 flex justify-center items-center">
                  <span className="text-white">{cart}</span>
                </div>
                <CartIcon />
              </button>
            </div>
            <div>
              <button
                aria-label="Go to wishlist page"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/wishlist");
                }}
                className="w-6 h-6 rounded-full relative"
              >
                <div className="absolute bg-red-400 h-4 w-4 -top-1  rounded-full -right-2 flex justify-center items-center">
                  <span className="text-white">{wishlist}</span>
                </div>
                <HeartIcon />
              </button>
            </div>
          </div>
          <div className="md:block hidden">
            <div className="w-10 h-10 relative">
              <button
                aria-label="Go open profile menu"
                onClick={clickHandler}
                className="w-full h-full bg-red-400 rounded-full p-1"
              >
                <ProfileIcon />
              </button>
              {clicked && <ProfileMenu />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Action;
