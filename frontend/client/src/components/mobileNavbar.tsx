import clsx from "clsx";
import { useLoggedInStore } from "../utils/store";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import AboutIcon from "./icons/About";
import ContactIcon from "./icons/Contact";
import LoginIcon from "./icons/Login";
import RegisterIcon from "./icons/Register";
import SearchIcon from "./icons/Search";
import ProductIcon from "./icons/Product";
import OrderIcon from "./icons/OrderIcon";
import SmallProfileIcon from "./icons/SmallProfile";
import HomeIcon from "./icons/Home";
import ExploreIcon from "./icons/Explore";
import SearchFormMobile from "./searchFormMobile";

interface MobileNavProps {
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
}

const MobileNav = ({ clicked, setClicked }: MobileNavProps) => {
  const user = useLoggedInStore((state) => state.user);

  return (
    <div
      className={clsx(
        "fixed bottom-0 md:hidden block bg-white border-l border-black w-2/3 mobile-nav pt-8",
        {
          "-right-80": !clicked,
          "right-0": clicked,
        }
      )}
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="mb-8">
        <SearchFormMobile />
      </div>
      <nav>
        <ul className="flex justify-start items-center flex-col gap-2">
          <li className="mb-1 w-full">
            <Link
              to={"/"}
              onClick={() => setClicked(false)}
              aria-label="About page"
              className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
            >
              <div>
                <HomeIcon />
              </div>
              <p>Home</p>
            </Link>
          </li>
          <li className="mb-1 w-full">
            <Link
              to={"/about"}
              onClick={() => setClicked(false)}
              aria-label="About page"
              className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
            >
              <div>
                <AboutIcon />
              </div>
              <p>About</p>
            </Link>
          </li>
          <li className="mb-1 w-full">
            <Link
              to={"/contact"}
              onClick={() => setClicked(false)}
              aria-label="Contact page"
              className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
            >
              <div>
                <ContactIcon />
              </div>
              <p>Contact</p>
            </Link>
          </li>
          <li className="mb-1 w-full">
            <Link
              to={"/explore"}
              onClick={() => setClicked(false)}
              aria-label="Contact page"
              className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
            >
              <div>
                <ExploreIcon />
              </div>
              <p>Explore</p>
            </Link>
          </li>
          {user === null ? (
            <>
              <li className="mb-1 w-full">
                <Link
                  to={"/login"}
                  onClick={() => setClicked(false)}
                  aria-label="Login page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <LoginIcon />
                  </div>
                  <p>Log In</p>
                </Link>
              </li>
              <li className="mb-1 w-full">
                <Link
                  to={"/register"}
                  onClick={() => setClicked(false)}
                  aria-label="Register page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <RegisterIcon />
                  </div>
                  <p>Sign Up</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="mb-1 w-full">
                <Link
                  to={"/products"}
                  onClick={() => setClicked(false)}
                  aria-label="Products page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <ProductIcon />
                  </div>
                  <p>Products</p>
                </Link>
              </li>
              <li className="mb-1 w-full">
                <Link
                  to={"/poducts"}
                  onClick={() => setClicked(false)}
                  aria-label="Products page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <OrderIcon />
                  </div>
                  <p>Orders</p>
                </Link>
              </li>
              <li className="mb-1 w-full">
                <Link
                  to={"/explore"}
                  onClick={() => setClicked(false)}
                  aria-label="Explore page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <SearchIcon />
                  </div>
                  <p>Explore</p>
                </Link>
              </li>
              <li className="mb-1 w-full">
                <Link
                  to={"/profile"}
                  onClick={() => setClicked(false)}
                  aria-label="Profile page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <SmallProfileIcon />
                  </div>
                  <p>Profile</p>
                </Link>
              </li>
              <li className="mb-1 w-full">
                <Link
                  to={"/logout"}
                  onClick={() => setClicked(false)}
                  aria-label="Logout page"
                  className="flex justify-start pl-4 items-center gap-4 h-10 bg-red-500 border-collapse w-full"
                >
                  <div>
                    <LoginIcon />
                  </div>
                  <p>Log Out</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNav;
