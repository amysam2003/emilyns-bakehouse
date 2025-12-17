import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emilynApi from "../api/emilynApi";
export default function EmilynCart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loadCart = async () => {
    try { setCart((await emilynApi.get("/cart")).data || { items: [] }); }
    catch (err) { console.error("Failed to load cart:", err); setCart({ items: [] }); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadCart(); }, []);
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;
    try { await emilynApi.put("/cart/update", { productId, quantity: qty }); loadCart(); }
    catch (err) { console.error("Oops! Failed to update quantity:", err); }
  };
  const removeItem = async productId => {
    try { await emilynApi.delete(`/cart/remove/${productId}`); loadCart(); }
    catch (err) { console.error("Oops! Failed to remove item:", err); }
  };
  const handleCheckout = () => navigate("/checkout");
  if (loading) return <p className="text-center mt-20">Please Wait! Loading your cart...</p>;
  if (!cart.items.length) return <p className="text-center mt-20">Your cart is empty 🛒</p>;
  const total = cart.items.reduce((sum, i) => sum + i.bakeryItemPrice * i.quantity, 0).toFixed(2);
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-pink-700 mb-8">Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.productId} className="flex items-center gap-6 mb-6 border-b pb-4">
          <img src={`http://localhost:5000/${item.bakeryItemImage}`} alt={item.bakeryItemName} className="w-24 h-24 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-semibold">{item.bakeryItemName}</h3>
            <p>AED {item.bakeryItemPrice}</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 bg-gray-200 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 bg-gray-200 rounded">+</button>
              <button onClick={() => removeItem(item.productId)} className="ml-4 text-red-500">Remove</button>
            </div>
          </div>
        </div>
      ))}
      <div className="text-right mt-6">
        <h3 className="text-xl font-bold">Total: AED {total}</h3>
        <button onClick={handleCheckout} className="mt-4 px-4 py-2 bg-pink-600 text-white rounded">Yay! Proceed to Checkout</button>
      </div>
    </div>
  );
}