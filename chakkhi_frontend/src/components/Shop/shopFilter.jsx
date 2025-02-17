import React, { useState, useEffect } from "react";

const ShopFilter = () => {
  const [filters, setFilters] = useState({
    latitude: null,
    longitude: null,
    category: "",
    ratings: 0,
    maxDistance: 5000,
  });
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const url = buildUrlWithParams("/shops", filters);

      const data = await url.json();
      setShops(data.shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFilters((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, []);

  return (
    <div>
      <h2>Find Shops Near You</h2>
      <div>
        <label>Category:</label>
        <select
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="grocery">Grocery</option>
          <option value="electronics">Electronics</option>
        </select>

        <label>Minimum Ratings:</label>
        <input
          type="number"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, ratings: e.target.value }))
          }
        />

        <label>Max Distance (in meters):</label>
        <input
          type="number"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxDistance: e.target.value }))
          }
        />

        <button onClick={fetchShops}>Search</button>
      </div>

      <div>
        <h3>Shops:</h3>
        {shops.map((shop) => (
          <div key={shop._id}>
            <h4>{shop.name}</h4>
            <p>Category: {shop.category}</p>
            <p>Ratings: {shop.ratings}</p>
            <p>Status: {shop.isOpen ? "Open" : "Closed"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopFilter;
