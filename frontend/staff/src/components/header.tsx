import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import MenuIcon from "./icons/menuIcon";
import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Navigation from "./navigation";
import ErrorDisplay from "./errordisplay";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
          className="h-7 w-7 border border-black/25 rounded-sm flex items-center justify-center"
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
      <ErrorDisplay />
    </>
  );
};

export default Header;
