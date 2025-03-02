import Logo from "./icons/logo";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbart";
import Action from "./action";
import ErrorMessageComponent from "./errorMessage";
import GeneralMessageComponent from "./successMessage";
import MenuIcon from "./icons/menuIcon";
import { lazy, Suspense, useContext, useEffect } from "react";
import { ErrorContext } from "../utils/errorContext";

const MobileButton = lazy(() => import("./mobileButton"));

const Fallback = () => {
  return (
    <button aria-label="Open menu" disabled className="w-6 h-6 md:hidden block">
      <MenuIcon />
    </button>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    const prefetch = async () => {
      try {
        await import("./mobileButton");
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
        className="flex justify-between items-center md:px-10 px-6 border-b border-black/50 h-14 fixed top-0 left-0 right-0 bg-white z-10 lg:max-w-1770"
      >
        <div className="h-10 w-10 relative">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="flex justify-start items-center gap-4 h-14">
          <div className="md:block hidden pr-4">
            <Navbar />
          </div>
          <div>
            <Action />
          </div>
          <div className="h-14 flex justify-center items-center">
            <Suspense fallback={<Fallback />}>
              <MobileButton />
            </Suspense>
          </div>
        </div>
      </header>
      <ErrorMessageComponent />
      <GeneralMessageComponent />
    </>
  );
};

export default Header;
