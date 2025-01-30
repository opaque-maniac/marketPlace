import { getUserID } from "../utils/cookies";
import { Outlet, Navigate } from "react-router-dom";

const Route = () => {
  const userID = getUserID();

  return userID ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default ProtectedRoute;
