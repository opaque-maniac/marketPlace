import { useLoggedInStore } from "../utils/store";

const Navbar = () => {
  const user = useLoggedInStore((state) => state.user);

  return (
    <nav>
      <ul className="flex justify-start items-center lg:gap-14 md:gap-8">
        {user === null ? (
          <>
            <li>
              <p>About</p>
            </li>
            <li>
              <p>Contact</p>
            </li>
            <li>
              <p>Log In</p>
            </li>
            <li>
              <p>Sign Up</p>
            </li>
          </>
        ) : (
          <>
            <li>
              <p>Products</p>
            </li>
            <li>
              <p>Orders</p>
            </li>
            <li>
              <p>Explore</p>
            </li>
            <li>
              <p>Log out</p>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
