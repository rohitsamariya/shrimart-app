import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

interface RoleGuardProps {
  role: "user" | "rider" | "admin" | "vendor";
}

export function RoleGuard({ role }: RoleGuardProps) {
  const { user, isLoggedIn } = useAuth();
  
  // Normalize role from customer selection
  const targetRole = role === "user" ? "user" : role;

  if (!isLoggedIn) {
     const redirectPath = role === "admin" ? "/login/admin" : role === "rider" ? "/login/rider" : "/login/customer";
     return <Navigate to={redirectPath} replace />;
  }

  if (user?.role !== targetRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
