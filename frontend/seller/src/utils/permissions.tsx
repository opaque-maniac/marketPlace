import { useEffect } from "react";
import userStore from "./store";
import { useLocation, useNavigate } from "react-router-dom";

const CheckPermissions = () => {
  const noPermissonRequired = [
    "/about",
    "/contact",
    "/terms",
    "/faq",
    "/privacy",
  ];
  const noAuthRequired = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const user = userStore((state) => state.user);
  const navigate = useNavigate();

  const path = useLocation().pathname;

  useEffect(() => {
    console.log(path);
    if (noPermissonRequired.includes(path)) {
      return;
    } else if (noAuthRequired.includes(path)) {
      if (user) {
        navigate("/login", { replace: true });
      }
      return;
    } else {
      if (!user) {
        navigate("/login", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, user, noAuthRequired, noPermissonRequired]);

  return null;
};

export default CheckPermissions;
