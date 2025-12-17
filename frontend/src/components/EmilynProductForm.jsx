import React, { useState } from "react";
import emilynApi from "../api/emilynApi";
import { useNavigate } from "react-router-dom";
export default function EmilynProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    bakeryItemName: "", bakeryItemDescription: "",
    bakeryItemPrice: "", bakeryItemCategory: "cakes",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (!imageFile) return setError("Please Upload an Image!");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("bakeryItemImage", imageFile);
    try {
      await emilynApi.post("/products/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Item Addition has failed.");
    }
  };
  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Add New Bakery Item</h3>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required name="bakeryItemName" value={form.bakeryItemName}
          onChange={handleChange} placeholder="Item Name" className="w-full border p-2 rounded" />
        <textarea required name="bakeryItemDescription" value={form.bakeryItemDescription}
          onChange={handleChange} placeholder="Description" rows="4"
          className="w-full border p-2 rounded" />
        <input required type="number" name="bakeryItemPrice" value={form.bakeryItemPrice}
          onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" />
        <select name="bakeryItemCategory" value={form.bakeryItemCategory}
          onChange={handleChange} className="w-full border p-2 rounded">
          {["cakes","cupcakes","pastries","snacks","puffs","buns","chocolates","specials"]
            .map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="file" accept="image/*"
          onChange={e => setImageFile(e.target.files[0])} />
        <button className="py-2 px-4 bg-pink-500 text-white rounded">Add Item</button>
      </form>
    </div>
  );
}