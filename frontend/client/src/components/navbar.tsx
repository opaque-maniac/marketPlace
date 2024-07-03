import { Link, useLocation } from "react-router-dom";
import { useLoggedInStore } from "../utils/store";
import clsx from "clsx";

const Navbar = () => {
  const user = useLoggedInStore((state) => state.user);
  const { pathname } = useLocation();

  return (
    <nav>
      <ul
        className={clsx("flex justify-start items-center lg:gap-14", {
          "md:gap-6": user !== null,
          "gap-4": user === null,
        })}
      >
        <li>
          <Link to={"/"}>
            <p className={pathname === "/" ? "underline" : ""}>Home</p>
          </Link>
        </li>
        {user !== null ? (
          <>
            <li>
              <Link to={"/about"}>
                <p className={pathname === "/about" ? "underline" : ""}>
                  About
                </p>
              </Link>
            </li>
            <li>
              <Link to={"/contact"}>
                <p className={pathname === "/contact" ? "underline" : ""}>
                  Contact
                </p>
              </Link>
            </li>
          </>
        ) : null}
        <li>
          <Link to={"/explore"}>
            <p className={pathname === "/explore" ? "underline" : ""}>
              Explore
            </p>
          </Link>
        </li>

        {user === null ? (
          <>
            <li>
              <Link to={"/login"}>
                <p className={pathname === "/login" ? "underline" : ""}>
                  Log In
                </p>
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <p className={pathname === "/register" ? "underline" : ""}>
                  Sign Up
                </p>
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
