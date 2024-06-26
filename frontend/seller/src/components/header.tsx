import { Link } from "react-router-dom";
import { useLoggedInStore } from "../utils/store";
import Navbar from "./navbar";
import ActionFeature from "./action";

const Header = () => {
  const user = useLoggedInStore((state) => state.user);

  return (
    <header className="border-b bg-gray-200 border-black h-14 flex items-center justify-center fixed top-0 left-0 right-0 w-screen z-30">
      <div className="flex items-center md:justify-center justify-between md:gap-20 lg:w-800 md:w-11/12 md:mx-auto w-full md:px-0 px-4 h-12">
        <div>
          <Link
            to={user ? "/products" : "/login"}
            className="block w-full h-full hover:underline font-bold"
          >
            <h2 className="font-serif text-lg">Hazina-S</h2>
          </Link>
        </div>
        <div className="md:block hidden">
          <Navbar />
        </div>
        <div>
          <ActionFeature />
        </div>
      </div>
    </header>
  );
};

export default Header;
