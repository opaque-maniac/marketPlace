import { MouseEventHandler, useContext, useState } from "react";
import MenuIcon from "./icons/menuIcon";
import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link } from "react-router-dom";
import Modal from "./modal";
import Navigation from "./navigation";
import { ShowErrorContext } from "../utils/errorContext";
import ShowError from "./showErr";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [err, setErr] = useContext(ShowErrorContext);
  const user = userStore((state) => state.user);

  const handleMenuToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsMenuOpen(() => true);
  };

  const closeCallback = () => {
    setIsMenuOpen(() => false);
  };

  return (
    <>
      <header
        role="banner"
        className="flex justify-between items-center px-10 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white shadow-md z-10"
      >
        <div className="h-10 w-10">
          <Link to={user ? "/" : "/login"}>
            <Logo />
          </Link>
        </div>
        <button
          onClick={handleMenuToggle}
          className="h-8 w-8 border border-black rounded-lg flex items-center justify-center"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        {isMenuOpen === true ? (
          <Modal callback={closeCallback}>
            <Navigation callback={closeCallback} />
          </Modal>
        ) : null}
        {err && <ShowError error={err} callback={() => setErr(null)} />}
      </header>
    </>
  );
};

export default Header;
