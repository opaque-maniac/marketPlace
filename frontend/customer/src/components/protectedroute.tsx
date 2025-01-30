import { getUserID } from "../utils/cookies";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userID = getUserID();

  return userID ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
