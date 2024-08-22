import { MouseEventHandler, useState } from "react";
import MenuIcon from "./icons/menuIcon";
import Logo from "./icons/logo";
import CloseIcon from "./icons/closeIcon";
import userStore from "../utils/store";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const user = userStore((state) => state.user);

  const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center px-10 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="h-10 w-10">
        <Link to={user ? "/" : "/login"}>
          <Logo />
        </Link>
      </div>
      <button
        onClick={handleMenuToggle}
        className="h-8 w-8 border border-black rounded-lg flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </header>
  );
};

export default Header;
