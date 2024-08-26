import { Link, useLocation } from "react-router-dom";
import useUserStore from "../utils/store";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className="flex justify-start items-center lg:gap-10 gap-6">
        <li>
          <Link className={pathname === "/" ? "underline" : ""} to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/explore" ? "underline" : ""}
            to={"/explore"}
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/about" ? "underline" : ""}
            to={"/about"}
          >
            About
          </Link>
        </li>
        {user ? (
          <li>
            <Link
              className={pathname === "/contact" ? "underline" : ""}
              to={"/contact"}
            >
              Contact
            </Link>
          </li>
        ) : (
          <li>
            <Link
              className={pathname === "/login" ? "underline" : ""}
              to={"/login"}
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
