import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "./icons/closeIcon";
import SearchForm from "./searchform";
import userStore from "../utils/store";
import { useMemo } from "react";

interface Props {
  callback: () => void;
}

const Navigation = ({ callback }: Props) => {
  const user = userStore((state) => state.user);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const logoutHanlder = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      callback();
      setTimeout(() => {
        navigate("/");
      }, 300);
    },
    [],
  );

  const clickHanlder = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      callback();
      setTimeout(() => {
        navigate(path);
      }, 300);
    },
    [callback, navigate],
  );

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
        <div className="h-20 mt-20">{user ? <SearchForm /> : null}</div>
        <nav role="navigation">
          <ul className="flex flex-col justify-start items-center gap-4">
            {user ? (
              <li>
                <Link
                  onClick={(e) => {
                    clickHanlder(e, "/");
                  }}
                  to={"/"}
                  className={path === "/" ? "underline" : ""}
                >
                  Home
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                onClick={(e) => {
                  clickHanlder(e, "/about");
                }}
                to={"/about"}
                className={path === "/about" ? "underline" : ""}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  clickHanlder(e, "/contact");
                }}
                to={"/contact"}
                className={path === "/contact" ? "underline" : ""}
              >
                Contact
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    onClick={(e) => {
                      clickHanlder(e, "/profile");
                    }}
                    to={"/profile"}
                    className={path === "/profile" ? "underline" : ""}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      clickHanlder(e, "/new");
                    }}
                    to={"/new"}
                    className={path === "/new" ? "underline" : ""}
                  >
                    New Product
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      clickHanlder(e, "/orders");
                    }}
                    to={"/orders"}
                    className={path === "/orders" ? "underline" : ""}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      logoutHanlder(e);
                    }}
                    to={"/logout"}
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
                    onClick={(e) => {
                      clickHanlder(e, "/login");
                    }}
                    to={"/login"}
                    className={path === "/login" ? "underline" : ""}
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      clickHanlder(e, "/register");
                    }}
                    to={"/register"}
                    className={path === "/register" ? "underline" : ""}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
