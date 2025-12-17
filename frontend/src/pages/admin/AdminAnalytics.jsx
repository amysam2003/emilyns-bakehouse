import React, { useEffect, useState } from "react";
import emilynApi from "../../api/emilynApi";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    emilynApi
      .get("/admin/analytics")
      .then(res => setStats(res.data))
      .catch(err => console.error("Analytics error:", err));
  }, []);
  if (!stats) return <p>Please wait! Loading analytics...</p>;
  const { summary = {}, recentOrders = [] } = stats;
  const paid = recentOrders.filter(o => o.isPaid).length;
  const pending = recentOrders.length - paid;
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Admin Dashboard - Emilyn’s Bakehouse
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value={summary.totalOrders || 0} />
        <StatCard title="Total Users" value={summary.totalUsers || 0} />
        <StatCard
          title="Total Revenue (AED)"
          value={`AED ${summary.totalSales || 0}`}
        />
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Chart Analytics</h2>
        <div className="max-w-sm mx-auto">
          <Pie
            data={{
              labels: ["Paid Orders", "Pending Orders"],
              datasets: [
                {
                  data: [paid, pending],
                  backgroundColor: ["#22c55e", "#f97316"]
                }
              ]
            }}
          />
        </div>
      </div>
      {!!recentOrders.length && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                {["Order ID", "Customer", "Total", "Status"].map(h => (
                  <th key={h} className="p-2 border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o._id}>
                  <td className="p-2 border">{o._id}</td>
                  <td className="p-2 border">
                    {o.customer?.fullName || "Guest"}
                  </td>
                  <td className="p-2 border">AED {o.totalPrice}</td>
                  <td className="p-2 border">
                    {o.isPaid ? "Paid" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);