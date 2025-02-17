import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ALL_SHOPS } from "@/api";

const ViewShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const navigate = useNavigate();
  const backendUrl = ALL_SHOPS;

  // Function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Fetch shops when coordinates change
  useEffect(() => {
    const fetchShops = async () => {
      if (!coordinates.latitude || !coordinates.longitude) return;

      try {
        const response = await axios.get(backendUrl, {
          params: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            maxDistance: 5000,
            category: "Grocery",
            ratings: 4,
            page: 1,
            limit: 10,
          },
        });

        console.log(response);

        const shopsWithDistance = response.data.data.map((shop) => {
          const distance = calculateDistance(
            coordinates.latitude,
            coordinates.longitude,
            shop.location.coordinates[0],
            shop.location.coordinates[1]
          );
          return { ...shop, distance };
        });

        setShops(shopsWithDistance || []);
      } catch (err) {
        setError("Failed to load shops");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [coordinates]);

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Failed to get location. Please enable location services.");
          console.error(err);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center p-4">Loading shops...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  const hanbleShopDetails = async (id) => {
    navigate(`check-shop/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nearby Shops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <div key={shop._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={
                    shop.image ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={shop.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{shop.name}</h2>
                <p>Category: {shop.category}</p>
                <p>Rating: {shop.rating} ⭐</p>
                <p>Distance: {shop.distance?.toFixed(2)} km</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => hanbleShopDetails(shop._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No shops found.</div>
        )}
      </div>
    </div>
  );
};

export default ViewShops;
