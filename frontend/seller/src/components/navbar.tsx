import { Link } from "react-router-dom";
import { useLoggedInStore } from "../utils/store";

const Navbar = () => {
  const user = useLoggedInStore((state) => state.user);

  return (
    <nav>
      <ul className="flex justify-start items-center lg:gap-14 md:gap-8">
        {user === null ? (
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
        ) : (
          <>
            <li>
              <Link to={"/products"}>
                <p>Products</p>
              </Link>
            </li>
            <li>
              <Link to={"/orders"}>
                <p>Orders</p>
              </Link>
            </li>
            <li>
              <Link to={"/explore"}>
                <p>Explore</p>
              </Link>
            </li>
            <li>
              <Link to={"/logout"}>
                <p>Log out</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
