import Logo from "./icons/logo";
import userStore from "../utils/store";
import { Link, useNavigate } from "react-router-dom";
import ErrorDisplay from "./errordisplay";
import MenuIcon from "./icons/menuIcon";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext } from "../utils/errorContext";

const HeaderMenuButton = lazy(() => import("./headermenu"));

const Fallback = () => {
  return (
    <button
      disabled
      className="h-7 w-7 border border-black/25 rounded-sm flex items-center justify-center"
      aria-label="Fetching menu"
    >
      <MenuIcon />
    </button>
  );
};

const Header = () => {
  const user = userStore((state) => state.user);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    const prefetch = async () => {
      try {
        await import("./headermenu");
      } catch (e) {
        console.log("Error prefetching", e);
        setError(true);
        navigate("/500", { replace: true });
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header
        role="banner"
        className="flex justify-between items-center md:px-10 px-2 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white z-10"
      >
        <div className="h-10 w-10">
          <Link to={user ? "/" : "/login"}>
            <Logo />
          </Link>
        </div>
        <Suspense fallback={<Fallback />}>
          <HeaderMenuButton />
        </Suspense>
      </header>
      <ErrorDisplay />
    </>
  );
};

export default Header;
