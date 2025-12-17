import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import emilynApi from "../api/emilynApi";
export default function EmilynProductList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await emilynApi.get("/products");
        setItems(res.data);
      } catch {
        setError("Failed to Load the Items!");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this bakery item?")) return;
    try {
      await emilynApi.delete(`/products/delete/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch {
      alert("Delete failed. Please try again!");
    }
  };
  if (loading) return <div>We are Loading Emilyn's Bakehouse menu...Please Wait!</div>;
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <div className="flex gap-4">
              <img
                src={`${import.meta.env.VITE_API_URL}/${item.bakeryItemImage}`}
                alt={item.bakeryItemName}
                className="w-28 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{item.bakeryItemName}</h4>
                <p className="text-sm text-gray-600">{item.bakeryItemCategory}</p>
                <p className="mt-2">{item.bakeryItemDescription}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="text-lg font-bold">AED {item.bakeryItemPrice}</div>
                  <Link to={`/admin/edit/${item._id}`} className="py-1 px-3 bg-yellow-400 rounded text-sm">Edit</Link>
                  <button onClick={() => handleDelete(item._id)} className="py-1 px-3 bg-red-500 text-white rounded text-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}