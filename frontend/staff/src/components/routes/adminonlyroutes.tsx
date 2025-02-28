import { Navigate, Outlet } from "react-router-dom";
import { getStaffRole } from "../../utils/cookies";

export default function AdminOnlyRoutes() {
  const isAdmin = getStaffRole() === "ADMIN";

  return isAdmin ? <Outlet /> : <Navigate to="/404" />;
}
