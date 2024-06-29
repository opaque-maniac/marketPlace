import { Link } from "react-router-dom";
import { useLoggedInStore } from "../utils/store";
import clsx from "clsx";

const Navbar = () => {
  const user = useLoggedInStore((state) => state.user);

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
            <p>Home</p>
          </Link>
        </li>
        {user !== null ? (
          <>
            <li>
              <Link to={"/about"}>
                <p>About</p>
              </Link>
            </li>
            <li>
              <Link to={"/contact"}>
                <p>Contact</p>
              </Link>
            </li>
          </>
        ) : null}
        <li>
          <Link to={"/explore"}>
            <p>Explore</p>
          </Link>
        </li>

        {user === null ? (
          <>
            <li>
              <Link to={"/login"}>
                <p>Log In</p>
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <p>Sign Up</p>
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
