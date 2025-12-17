import React from "react";
export default function EmilynSearchFilter({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="bg-pink-50 p-4 rounded-xl shadow mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Search Bakery Items
          </label>
          <input
            type="text"
            placeholder="Search for Cakes, Pastries, Buns, Chocolates,..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="">All Categories</option>
            <option value="cakes">Cakes</option>
            <option value="cupcakes">Cupcakes</option>
            <option value="pastries">Pastries</option>
            <option value="snacks">Snacks</option>
            <option value="puffs">Puffs</option>
            <option value="buns">Buns</option>
            <option value="chocolates">Chocolates</option>
            <option value="specials">Specials</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Max Price (AED)
          </label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">
            Up to AED {maxPrice}
          </p>
        </div>

      </div>
    </div>
  );
}