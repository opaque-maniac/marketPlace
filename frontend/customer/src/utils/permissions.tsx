import { useEffect } from "react";
import userStore from "./store";
import { useLocation, useNavigate } from "react-router-dom";

const CheckPermissions = () => {
  const noPermissionRequired = [
    /^\/$/,
    /^\/about$/,
    /^\/contact$/,
    /^\/terms$/,
    /^\/faq$/,
    /^\/privacy$/,
    /^\/explore$/,
    /^\/products\/\d+$/, // Public route for /products/:id where :id is a number
  ];
  const noAuthRequired = [
    /^\/login$/,
    /^\/register$/,
    /^\/forgot-password$/,
    /^\/reset-password$/,
  ];

  const user = userStore((state) => state.user);
  const navigate = useNavigate();

  const path = useLocation().pathname;

  useEffect(() => {
    if (noPermissionRequired.some((regex) => regex.test(path))) {
      return;
    } else if (noAuthRequired.some((regex) => regex.test(path))) {
      if (user) {
        navigate("/", { replace: true }); // Redirect to home or another appropriate page
      }
      return;
    } else {
      if (!user) {
        navigate("/login", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, user]);

  return null;
};

export default CheckPermissions;
