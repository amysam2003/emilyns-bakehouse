import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("emilyn_user") || "{}");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("emilyn_token");
    localStorage.removeItem("emilyn_user");
    navigate("/"); 
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white p-4 rounded shadow">
          <div className="font-semibold text-lg">{user.fullName || "Customer"}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <nav className="mt-6 space-y-2">
            <Link to="/dashboard/orders" className="block py-2 px-3 rounded hover:bg-gray-100">My Orders</Link>
            <Link to="/dashboard/profile" className="block py-2 px-3 rounded hover:bg-gray-100">My Profile</Link>
            <button onClick={handleLogout} className="mt-4 text-red-600">Sign out</button>
          </nav>
        </aside>
        <main className="md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}