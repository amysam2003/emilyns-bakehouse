import React, { useEffect, useState } from "react";
import EmilynCheckoutWrapper from "../components/EmilynCheckout";
import emilynApi from "../api/emilynApi";
export default function EmilynCheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("emilyn_user") || "{}");
  const customer = { name: user.fullName || "Guest Customer", email: user.email || "guest@example.com" };
  useEffect(() => {
    const fetchCart = async () => {
      try { setCartItems((await emilynApi.get("/cart")).data.items || []); }
      catch (err) { console.error("Failed to load cart for checkout:", err); }
      finally { setLoading(false); }
    };
    fetchCart();
  }, []);
  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Please Wait! Loading your cart...</p></div>;
  const cart = { items: cartItems, total: cartItems.reduce((sum, i) => sum + i.bakeryItemPrice * i.quantity, 0) };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <EmilynCheckoutWrapper cart={cart} customer={customer} />
    </div>
  );
}