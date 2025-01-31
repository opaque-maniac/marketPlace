import { getUserID } from "../../utils/cookies";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userID = getUserID();

  return !userID ? <Navigate to="/login" /> : <Outlet />;
}
