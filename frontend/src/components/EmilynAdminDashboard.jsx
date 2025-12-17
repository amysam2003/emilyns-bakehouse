import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
export default function EmilynAdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("emilyn_user") || "{}");
  const handleLogout = () => {
    localStorage.removeItem("emilyn_token");
    localStorage.removeItem("emilyn_user");
    navigate("/admin/login");
  };
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-5">
        <h2 className="text-xl font-bold text-pink-600 mb-6">
          Emilyn’s Bakehouse
        </h2>
        <div className="mb-6">
          <div className="text-sm text-gray-600">Signed in as</div>
          <div className="font-medium text-gray-800">
            {user.fullName || "Admin"}
          </div>
        </div>
        <nav className="space-y-2 text-sm">
          <Link
            to="/admin"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            Menu Items
          </Link>
          <Link
            to="/admin/add"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            Add New Item
          </Link>
          <Link
            to="/admin/analytics"
            className="block py-2 px-3 rounded hover:bg-gray-100"
          >
            View Analytics
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 text-sm text-red-600 hover:underline"
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
