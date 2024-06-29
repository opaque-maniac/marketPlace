import { Link } from "react-router-dom";
import Navbar from "./navbar";
import ActionFeature from "./action";
import { useContext } from "react";
import ValidationContext from "../utils/validationContext";

const Header = () => {
  const [error] = useContext(ValidationContext);

  return (
    <header className="border-b bg-white border-black h-14 flex items-center justify-center fixed top-0 left-0 right-0 w-screen z-30">
      <div className="flex items-center md:justify-evenly justify-between md:gap-20 lg:w-1100 md:w-12/12 md:mx-auto w-full md:px-0 px-4 h-12 md:px-2">
        <div>
          <Link
            to={"/"}
            className="block w-full h-full hover:underline font-bold"
          >
            <h2 className="font-serif text-lg">Hazina</h2>
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
