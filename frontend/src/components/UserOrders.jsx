import React, { useEffect, useState } from "react";
import emilynApi from "../api/emilynApi";
import { Link } from "react-router-dom";
export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await emilynApi.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.error("Load orders error", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { loadOrders(); }, []);
  if (loading) return <div>Hello! We are loading your orders...Please wait!</div>;
  if (!orders.length) return <div>Hello! You have no orders yet.</div>;
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">My Orders</h3>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Order #{order._id.slice(-6)}</div>
                <div className="text-sm text-gray-500">Placed: {new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">AED {order.totalPrice.toFixed(2)}</div>
                <div className="text-sm">{order.isPaid ? "Paid" : "Unpaid"}</div>
                <Link to={`/dashboard/orders/${order._id}`} className={`mt-2 inline-block text-sm ${ order.isPaid? "text-pink-600" : "bg-pink-600 text-white px-3 py-1 rounded"}`}> {order.isPaid ? "View details" : "Order Now"} </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}