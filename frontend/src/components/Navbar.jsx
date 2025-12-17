import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-pink-600">
        Emilyn’s Bakehouse
      </Link>
      <div className="flex gap-6 text-sm text-gray-700">
        <Link to="/menu" className="hover:text-pink-600">
          Browse
        </Link>
        <Link to="/cart" className="hover:text-pink-600">
          Cart
        </Link>
        <Link to="/dashboard/orders" className="hover:text-pink-600">
          Orders
        </Link>
        <Link to="/find-us" className="hover:text-pink-600">
          Find Us
        </Link>
      </div>
    </nav>
  );
}