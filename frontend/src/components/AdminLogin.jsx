import React, { useState } from "react";
import emilynApi from "../api/emilynApi";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await emilynApi.post("/auth/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("emilyn_token", token);
      localStorage.setItem("emilyn_user", JSON.stringify(res.data.user));
      navigate("/admin");
    } catch (err) {
      console.error("Oops! Login error:", err);
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-pink-600 mb-4">Emilyn’s Bakehouse - Admin Login</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              className="mt-1 block w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              className="mt-1 block w-full border rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded">
            Sign in as Emilyn Cynthia
          </button>
        </form>
      </div>
    </div>
  );
}