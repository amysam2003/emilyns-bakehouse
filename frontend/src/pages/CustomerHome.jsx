import React from "react";
import { Link } from "react-router-dom";
export default function CustomerHome() {
  const cardClass = "bg-white shadow-md hover:shadow-xl rounded-lg p-6 transition transform hover:-translate-y-1 text-center";
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-20 relative text-center">
        <Link to="/admin/login" className="absolute top-6 right-6 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow transition">
          Admin Login
        </Link>
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4">Welcome to Emilyn’s Bakehouse!</h1>
        <p className="text-xl text-gray-700 mb-8">Freshly Baked Delights - Cakes, Pastries, Buns & More Delivered with Love!</p>
                <Link to="/menu" className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition"> Order Now </Link>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/cart" className={cardClass}>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Your Cart</h2>
          <p className="text-gray-600">Add your favorite items and checkout</p>
        </Link>
        <Link to="/find-us" className={cardClass}>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Find Us</h2>
          <p className="text-gray-600">Locate our bakery on the map and visit us</p>
        </Link>
        <Link to="/dashboard" className={cardClass}>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Your Account</h2>
          <p className="text-gray-600">Track your orders and manage your profile easily</p>
        </Link>
      </div>
      <div className="bg-pink-100 py-12 text-center mt-12">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">Hurray! Ready to Treat Yourself?</h2>
        <Link to="/menu" className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition"> Order Now </Link>
      </div>
    </div>
  );
}