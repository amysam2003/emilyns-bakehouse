import { Navigate } from "react-router-dom";
export default function RequireCustomerAuth({ children }) {
  const token = localStorage.getItem("emilyn_token");
  const user = JSON.parse(localStorage.getItem("emilyn_user") || "{}");
  if (!token || user.role === "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}