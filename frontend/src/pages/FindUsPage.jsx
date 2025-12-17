import React from "react";
import EmilynBakehouseMap from "../components/EmilynBakehouseMap";
export default function FindUsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <EmilynBakehouseMap />
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Visit Our Bakery</h3>
        <p>Dubai, UAE</p>
        <p>Open: 9 AM – 9 PM</p>
        <p>Contact: +971-231-750</p>
      </div>
    </div>
  );
}
