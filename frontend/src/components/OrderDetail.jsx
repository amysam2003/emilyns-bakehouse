import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import emilynApi from "../api/emilynApi";
export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const load = async () => {
      try { setOrder((await emilynApi.get(`/orders/${id}`)).data); }
      catch (err) { console.error("Load order detail", err); }
    };
    load();
  }, [id]);
  if (!order) return <div>Hello! We are loading your order...Please wait!</div>;
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Order Details #{order._id.slice(-6)}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Items</h4>
          <div className="space-y-2 mt-2">
            {order.items.map(it => (
              <div key={it._id} className="flex items-center gap-3">
                <img src={`${import.meta.env.VITE_API_URL}/${it.bakeryItemImage}`} alt={it.bakeryItemName} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-medium">{it.bakeryItemName}</div>
                  <div className="text-sm">Qty: {it.quantity} x AED {it.bakeryItemPrice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium">Summary</h4>
          <div className="mt-2">
            <div>Items: AED {order.itemsPrice.toFixed(2)}</div>
            <div>Shipping: AED {order.shippingPrice?.toFixed(2) ?? "0.00"}</div>
            <div>Tax: AED {order.taxPrice?.toFixed(2) ?? "0.00"}</div>
            <div className="font-bold mt-2">Total: AED {order.totalPrice.toFixed(2)}</div>
            <div className="mt-2">Payment: {order.isPaid ? `Paid (${order.paymentMethod})` : "Pending"}</div>
          </div>
          <div className="mt-4">
            <h5 className="font-medium">Shipping Address</h5>
            <div className="text-sm">{order.shippingAddress?.addressLine1 ?? "Not provided"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}