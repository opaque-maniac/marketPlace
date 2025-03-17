import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "./icons/closeIcon";
import SearchForm from "./searchform";
import userStore from "../utils/store";
import { removeAccessToken, removeRefreshToken } from "../utils/cookies";

interface Props {
  callback: () => void;
}

const Navigation = ({ callback }: Props) => {
  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const logoutHandler = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      removeAccessToken();
      removeRefreshToken();
      removeUser();
      navigate("/", { replace: true });
      callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, navigate],
  );

  // Memoize the clickHandler to avoid recreating the function on every render
  const clickHandler = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      callback();
      setTimeout(() => {
        navigate(path);
      }, 300);
    },
    [callback, navigate],
  );

  // Memoize the navigation links to prevent unnecessary recalculations
  const navigationLinks = useMemo(() => {
    return (
      <>
        <li>
          <Link
            onClick={(e) => clickHandler(e, "/")}
            to="/"
            className={path === "/" ? "underline" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => clickHandler(e, "/about")}
            to="/about"
            className={path === "/about" ? "underline" : ""}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => clickHandler(e, "/contact")}
            to="/contact"
            className={path === "/contact" ? "underline" : ""}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => clickHandler(e, "/explore")}
            to="/explore"
            className={path === "/explore" ? "underline" : ""}
          >
            Explore
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link
                onClick={(e) => clickHandler(e, "/orders")}
                to="/orders"
                className={path === "/orders" ? "underline" : ""}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => clickHandler(e, "/profile")}
                to="/profile"
                className={path === "/profile" ? "underline" : ""}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => logoutHandler(e)}
                to="/logout"
                className={path === "/logout" ? "underline" : ""}
              >
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                onClick={(e) => clickHandler(e, "/login")}
                to="/login"
                className={path === "/login" ? "underline" : ""}
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => clickHandler(e, "/register")}
                to="/register"
                className={path === "/register" ? "underline" : ""}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </>
    );
  }, [clickHandler, path, user, logoutHandler]);

  return (
    <>
      <button
        aria-label="Close Menu"
        onClick={(e) => {
          e.preventDefault();
          callback();
        }}
        className="h-8 w-8 fixed top-4 left-4 z-40 bg-white rounded-lg border border-black flex items-center justify-center"
      >
        <CloseIcon />
      </button>
      <div className="fixed h-screen md:w-96 w-52 top-0 right-0 z-40 bg-white px-2">
        <nav role="navigation" className="mt-20">
          <ul className="flex flex-col justify-start items-center gap-4">
            {navigationLinks}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
