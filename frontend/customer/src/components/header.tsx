import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link } from "react-router-dom";
import Navbar from "./navbart";
import Action from "./action";
import MobileButton from "./mobileButton";

const Header = () => {
  const user = userStore((state) => state.user);

  return (
    <header
      role="banner"
      className="flex justify-between items-center md:px-10 px-6 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white z-10 lg:max-w-1770"
    >
      <div className="h-10 w-10">
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
  );
};

export default Header;
