import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link } from "react-router-dom";
import Navbar from "./navbart";
import Action from "./action";
import MobileButton from "./mobileButton";
import { MouseEventHandler, useContext } from "react";
import { ShowErrorContext } from "../utils/errorContext";
import Transition from "./transition";
import CloseIcon from "./icons/closeIcon";

const Header = () => {
  const user = userStore((state) => state.user);
  const [err, setErr] = useContext(ShowErrorContext);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setErr(() => null);
  };

  return (
    <>
      <header
        role="banner"
        className="flex justify-between items-center md:px-10 px-6 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white z-10 lg:max-w-1770"
      >
        <div className="h-10 w-10 relative">
          <Link to={user ? "/" : "/login"}>
            <Logo />
          </Link>
        </div>
        <div className="flex justify-start items-center gap-4 h-14">
          <div className="md:block hidden pr-4">
            <Navbar />
          </div>
          <div>
            <Action />
          </div>
          <div className="h-14 flex justify-center items-center">
            <MobileButton />
          </div>
        </div>
      </header>
      {err && (
        <Transition>
          <div className="fixed top-16 right-2 w-80 h-16 rounded-md bg-red-400 p-2 flex justify-start gap-1">
            <p className="w-11/12">{err}</p>
            <div>
              <button
                onClick={clickHandler}
                className="w-10 h-10 border border-black rounded-full"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </Transition>
      )}
    </>
  );
};

export default Header;
