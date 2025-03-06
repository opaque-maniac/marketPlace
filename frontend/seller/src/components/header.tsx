import { MouseEventHandler, useState } from "react";
import MenuIcon from "./icons/menuIcon";
import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Navigation from "./navigation";
import ShowError from "./errorcomponet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const user = userStore((state) => state.user);

  const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen(() => true);
  };

  const closeCallback = () => {
    setIsMenuOpen(() => false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-black/50 z-10">
      <header
        role="banner"
        className="flex justify-between items-center h-14 mx-auto max-w-1300 xl:px-0 px-2"
      >
        <div className="h-10 w-10">
          <Link to={user ? "/?page=1&query=" : "/login"}>
            <Logo />
          </Link>
        </div>
        <button
          onClick={handleMenuToggle}
          className="h-[30px] w-[30px] border border-black rounded flex items-center justify-center"
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
      <ShowError />
    </div>
  );
};

export default Header;
