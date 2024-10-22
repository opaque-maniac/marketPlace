import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import MenuIcon from "./icons/menuIcon";
import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Navigation from "./navigation";
import { ShowErrorContext } from "../utils/errorContext";
import Transition from "./transition";
import CloseIcon from "./icons/closeIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [err, setErr] = useContext(ShowErrorContext);
  const user = userStore((state) => state.user);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.key === "ArrowLeft") {
        setIsMenuOpen(() => true);
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.shiftKey && e.key === "ArrowLeft") {
          setIsMenuOpen(() => true);
        }
      });
    };
  }, []);

  const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen(() => true);
  };

  const closeCallback = useCallback(() => {
    setIsMenuOpen(() => false);
  }, []);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setErr(null);
  };

  return (
    <>
      <header
        role="banner"
        className="flex justify-between items-center px-10 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white z-10"
      >
        <div className="h-10 w-10">
          <Link to={user ? "/" : "/login"}>
            <Logo />
          </Link>
        </div>
        <button
          onClick={handleMenuToggle}
          className="h-7 w-7 border border-black rounded-lg flex items-center justify-center"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        {isMenuOpen === true ? (
          <Modal callback={closeCallback}>
            <Navigation callback={closeCallback} />
          </Modal>
        ) : null}
      </header>
      {err && (
        <Transition>
          <div className="fixed top-16 right-2 z-40 w-80 h-16 rounded-md bg-red-400 p-2 flex justify-start gap-1">
            <p className="w-11/12">{err}</p>
            <div>
              <button
                onClick={clickHandler}
                className="w-8 h-8 border border-black rounded-full"
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
