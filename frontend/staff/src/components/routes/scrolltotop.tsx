import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function ScrollToTopRoute() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Outlet />;
}
