import { getUserID } from "../utils/cookies";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = () => {
  const userID = getUserID();

  return userID ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default AuthRoute;
