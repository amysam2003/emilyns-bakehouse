import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emilynApi from "../api/emilynApi";
export default function CustomerLogin() {
  const [email, setEmail] = useState(""), [password, setPassword] = useState(""), [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await emilynApi.post("/auth/login", { email, password });
      localStorage.setItem("emilyn_token", res.data.token);
      localStorage.setItem("emilyn_user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch {
      setError("Oops, Sorry! This is an Invalid Login!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Customer Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input className="border p-2 w-full mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="border p-2 w-full mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-pink-600 text-white py-2 rounded">Login</button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account? <Link to="/register" className="text-pink-600 underline">Register</Link>
        </p>
      </form>
    </div>
  );
}