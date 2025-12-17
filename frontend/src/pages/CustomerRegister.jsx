import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emilynApi from "../api/emilynApi";
export default function CustomerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", userRole: "customer" });
  const [error, setError] = useState("");
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await emilynApi.post("/auth/signup", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Oops, Sorry! Your Registration has failed. Please try again!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Create an Account</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input name="fullName" placeholder="Full Name" className="border p-2 w-full mb-3" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-4" onChange={handleChange} required />
        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">Register</button>
        <p className="text-sm mt-4 text-center">
          Already have an account? <Link to="/login" className="text-pink-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}