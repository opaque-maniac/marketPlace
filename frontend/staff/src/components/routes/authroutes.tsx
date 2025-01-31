import { Navigate, Outlet } from "react-router-dom";
import { getUserID } from "../../utils/cookies";

export default function AuthRoute() {
  const user = getUserID();

  return !user ? <Outlet /> : <Navigate to="/" />;
}
