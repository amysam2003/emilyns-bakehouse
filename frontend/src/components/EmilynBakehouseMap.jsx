import { useState, useEffect } from "react";
export default function EmilynBakehouseMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const location = { lat: 25.2048, lng: 55.2708 };
  useEffect(() => {
    const script = Object.assign(document.createElement("script"), {
      src: `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
      async: true,
      defer: true,
      onload: () => setMapLoaded(true),
    });
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    if (!mapLoaded) return;
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      { center: location, zoom: 14 }
    );
    new window.google.maps.Marker({ position: location, map, title: "Emilyn's Bakehouse" });
  }, [mapLoaded]);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Find Emilyn&apos;s Bakehouse</h2>
      <div id="map" className="w-full h-[400px] rounded-lg" />
    </div>
  );
}