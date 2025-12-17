import { Navigate } from "react-router-dom";
export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("emilyn_token");
  const user = JSON.parse(localStorage.getItem("emilyn_user") || "{}");
  if (!token || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}