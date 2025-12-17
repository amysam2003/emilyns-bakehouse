import React from "react";
export default function EmilynProductCard({ bakeItem }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={`${import.meta.env.VITE_API_URL}/${bakeItem.bakeryItemImage}`}
        alt={bakeItem.bakeryItemName}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {bakeItem.bakeryItemName}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {bakeItem.bakeryItemDescription}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-pink-600 font-bold text-lg">
            AED {bakeItem.bakeryItemPrice}
          </span>
          <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
            {bakeItem.bakeryItemCategory}
          </span>
        </div>
      </div>
    </div>
  );
}