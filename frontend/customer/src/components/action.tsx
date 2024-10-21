import useUserStore from "../utils/store";
import ProfileIcon from "./icons/profileIcon";

import SearchForm from "./searchform";
import { MouseEventHandler, useState } from "react";
import ProfileMenu from "./profilemenu";
import WishlistComponent from "./wishlist/wishlistComponent";
import CartComponent from "./cart/cartComponent";

const Action = () => {
  const user = useUserStore((state) => state.user);
  const [clicked, setClicked] = useState<boolean>(false);

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
            <CartComponent />
            <WishlistComponent />
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
              {clicked && (
                <ProfileMenu callback={() => setClicked(() => false)} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Action;
