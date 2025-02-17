import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ErrorContext } from "../utils/errorContext";

const ServerErrorRoute = () => {
  const [error] = useContext(ErrorContext);

  return error ? <Outlet /> : <Navigate to={"/404"} />;
};

export default ServerErrorRoute;
