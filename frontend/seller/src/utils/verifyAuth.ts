import { useEffect } from "react";
import { useLoggedInStore } from "./store";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyAuth = () => {
  const { pathname } = useLocation();
  const user = useLoggedInStore((state) => state.user);
  const navigate = useNavigate();

  const generalPaths = ["/about", "/contact"];
  const noAuthPaths = ["/login", "/signup"];

  useEffect(() => {
    if (!user) {
      if (generalPaths.includes(pathname)) {
        return;
      }

      if (noAuthPaths.includes(pathname)) {
        return;
      }

      navigate("/login", { replace: true });
    } else {
      if (noAuthPaths.includes(pathname)) {
        navigate("/products", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user]);

  return null;
};

export default VerifyAuth;
