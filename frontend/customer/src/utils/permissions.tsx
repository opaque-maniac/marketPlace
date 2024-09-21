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
    /^\/search/,
    /^\/products\/[^/]+$/,
    /^\/categories\/[^/]+$/,
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
    const isNoPermissionRequired = noPermissionRequired.some((regex) =>
      regex.test(path),
    );
    const isNoAuthRequired = noAuthRequired.some((regex) => regex.test(path));

    if (isNoPermissionRequired) {
      // No permission check needed
      return;
    }

    if (isNoAuthRequired) {
      // No authentication required, but user is logged in
      if (user) {
        navigate("/", { replace: true }); // Redirect to home or another appropriate page
      }
      return;
    }

    // All other routes require authentication
    if (!user) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, user, navigate]);

  return null;
};

export default CheckPermissions;
