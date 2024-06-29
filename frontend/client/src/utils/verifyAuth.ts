import { useEffect } from "react";
import { useLoggedInStore } from "./store";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyAuth = () => {
  const { pathname } = useLocation();
  const user = useLoggedInStore((state) => state.user);
  const navigate = useNavigate();

  const noAuthPaths = ["/login", "/register"];
  const authPaths = ["/orders", "/cart", "/wishlist", "/profile"];

  useEffect(() => {
    if (!user) {
      if (authPaths.includes(pathname)) {
        navigate("/login", { replace: true });
      }
    } else {
      if (noAuthPaths.includes(pathname)) {
        navigate("/", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

  return null;
};

export default VerifyAuth;
