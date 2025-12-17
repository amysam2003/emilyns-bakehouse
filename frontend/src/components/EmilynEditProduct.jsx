import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emilynApi from "../api/emilynApi";
export default function EmilynEditProduct() {
  const { id } = useParams(), navigate = useNavigate();
  const [form, setForm] = useState(), [image, setImage] = useState();
  useEffect(() => {
    emilynApi.get("/products").then(({ data }) => {
      const i = data.find(p => p._id === id);
      i ? setForm(i) : navigate("/admin");
    });
  }, [id, navigate]);
  if (!form) return <>Please wait! Loading...</>;
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    ["bakeryItemName","bakeryItemDescription","bakeryItemPrice","bakeryItemCategory"]
      .forEach(k => fd.append(k, form[k]));
    image && fd.append("bakeryItemImage", image);
    await emilynApi.put(`/products/update/${id}`, fd);
    navigate("/admin");
  };
  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h3 className="font-semibold mb-4">Edit Bakery Item</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="bakeryItemName" value={form.bakeryItemName} onChange={onChange} className="w-full border p-2 rounded" required />
        <textarea name="bakeryItemDescription" value={form.bakeryItemDescription} onChange={onChange} rows="4" className="w-full border p-2 rounded" required />
        <input type="number" name="bakeryItemPrice" value={form.bakeryItemPrice} onChange={onChange} className="w-full border p-2 rounded" required />
        <select name="bakeryItemCategory" value={form.bakeryItemCategory} onChange={onChange} className="w-full border p-2 rounded">
          {["cakes","cupcakes","pastries","snacks","puffs","buns","chocolates","specials"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Yippie! Save Changes</button>
      </form>
    </div>
  );
}