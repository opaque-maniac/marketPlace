import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function ScrollResetRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
}
