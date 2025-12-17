import React, { useEffect, useState } from "react";
import emilynApi from "../api/emilynApi";
export default function UserProfile() {
  const storedUser = JSON.parse(localStorage.getItem("emilyn_user") || "{}");
  const [form, setForm] = useState({ fullName: storedUser.fullName || "", email: storedUser.email || "" });
  const [msg, setMsg] = useState("");
  const [pw, setPw] = useState({ currentPassword: "", newPassword: "" });
  const [pwMsg, setPwMsg] = useState("");
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await emilynApi.put("/users/profile", form);
      localStorage.setItem("emilyn_user", JSON.stringify(res.data.user));
      setMsg("Profile updated!");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Update failed");
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await emilynApi.put("/users/change-password", pw);
      setPwMsg("Password changed successfully");
      setPw({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwMsg(err?.response?.data?.message || "Password change failed");
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Profile</h4>
        {msg && <div className="text-green-600 mb-2">{msg}</div>}
        <form onSubmit={handleUpdateProfile} className="space-y-3">
          <input value={form.fullName} onChange={(e)=>setForm({...form, fullName:e.target.value})} className="w-full border p-2 rounded" />
          <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} className="w-full border p-2 rounded" />
          <button className="py-2 px-4 bg-pink-500 text-white rounded">Save Profile</button>
        </form>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-3">Change Password</h4>
        {pwMsg && <div className="text-green-600 mb-2">{pwMsg}</div>}
        <form onSubmit={handleChangePassword} className="space-y-3">
          <input type="password" value={pw.currentPassword} onChange={(e)=>setPw({...pw, currentPassword:e.target.value})} placeholder="Current password" required className="w-full border p-2 rounded" />
          <input type="password" value={pw.newPassword} onChange={(e)=>setPw({...pw, newPassword:e.target.value})} placeholder="New password" required className="w-full border p-2 rounded" />
          <button className="py-2 px-4 bg-yellow-500 text-white rounded">Change Password</button>
        </form>
      </div>
    </div>
  );
}