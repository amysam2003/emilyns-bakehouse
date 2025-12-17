import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import emilynApi from "../api/emilynApi";
import EmilynProductCard from "../components/EmilynProductCard";
import EmilynSearchFilter from "../components/EmilynSearchFilter";
export default function EmilynProductCatalog() {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(500);
  const [loading, setLoading] = useState(true);
  const [cartQty, setCartQty] = useState({});
  const user = JSON.parse(localStorage.getItem("emilyn_user"));
  useEffect(() => {
    (async () => {
      try {
        const res = await emilynApi.get("/products");
        setAllItems(res.data);
        setFilteredItems(res.data);
      } catch (e) { console.error("Oops,Failed to load bakery items:", e); }
      finally { setLoading(false); }
    })();
  }, []);
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await emilynApi.get("/cart");
        const qty = {};
        res.data.items.forEach(i => qty[i.productId] = i.quantity);
        setCartQty(qty);
      } catch (e) { console.error("Oops,Failed to fetch cart:", e); }
    })();
  }, [user]);
  useEffect(() => {
    let items = allItems;
    if (searchText) items = items.filter(i => i.bakeryItemName.toLowerCase().includes(searchText.toLowerCase()));
    if (selectedCategory) items = items.filter(i => i.bakeryItemCategory === selectedCategory);
    items = items.filter(i => i.bakeryItemPrice <= maxPrice);
    setFilteredItems(items);
  }, [searchText, selectedCategory, maxPrice, allItems]);
  const addToCart = async id => {
    if (!user) return alert("Please login to add items to cart");
    try { await emilynApi.post("/cart/add", { productId: id, quantity: 1 }); setCartQty(prev => ({ ...prev, [id]: 1 })); alert(`${user.fullName}, your item has been added 🛒`); }
    catch (e) { console.error("Add to cart error:", e); alert("Failed to add item. Try again."); }
  };
  const increase = async id => { try { await emilynApi.post("/cart/add", { productId: id, quantity: 1 }); setCartQty(prev => ({ ...prev, [id]: (prev[id]||0)+1 })); } catch (e) { console.error("Failed to increase quantity:", e); } };
  const decrease = async id => { const qty = cartQty[id]||0; if (!qty) return; try { await emilynApi.put("/cart/update", { productId: id, quantity: qty-1 }); setCartQty(prev => ({ ...prev, [id]: qty-1 })); } catch (e) { console.error("Failed to decrease quantity:", e); } };
  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-lg text-gray-600">Applying your filter... Please wait!</p></div>;
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-pink-700">Explore Our Bakery Menu</h2>
          <div className="flex gap-4 text-pink-600 font-medium">
            <Link to="/cart" className="hover:underline">🛒View Cart</Link>
            <Link to="/find-us" className="hover:underline">📍Find Us</Link>
            {user ? (<Link to="/dashboard" className="hover:underline font-semibold">𖨆 {user.fullName} </Link>) : ( <Link to="/dashboard" className="hover:underline"> 𖨆 My Account </Link>)}
          </div>
        </div>
        <EmilynSearchFilter
          searchText={searchText} setSearchText={setSearchText}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        />
        {filteredItems.length===0 ? (
          <p className="text-center text-gray-500 mt-10">Sorry, No bakery items available at this moment. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredItems.map(i => (
              <div key={i._id}>
                <EmilynProductCard bakeItem={i}/>
                {cartQty[i._id]>0 ? (
                  <div className="flex items-center justify-between mt-3">
                    <button onClick={()=>decrease(i._id)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                    <span>{cartQty[i._id]}</span>
                    <button onClick={()=>increase(i._id)} className="px-3 py-1 bg-pink-600 text-white rounded">+</button>
                  </div>
                ) : (
                  <button onClick={()=>addToCart(i._id)} className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded">🛒 Add to Cart</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="bg-pink-600 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Emilyn’s Bakehouse. All rights reserved.</p>
          <Link to="/find-us" className="mt-2 md:mt-0 hover:underline">📍 Find Us</Link>
        </div>
      </footer>
    </div>
  );
}