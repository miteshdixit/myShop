import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerHero = () => {
  // const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState(null);
  const navigate = useNavigate();

  // Initialize state for location and other query params
  const [queryParams, setQueryParams] = useState({
    latitude: null,
    longitude: null,
    category: "grocery",
    orderType: "new",
    searchTerm: "",
  });

  const { latitude, longitude, category, orderType, searchTerm } = queryParams;

  console.log(latitude, longitude);

  const handleOrderClick = () => {
    navigate("/shop-owner/orders", {
      state: {
        latitude,
        longitude,
        category,
        orderType,
        searchTerm,
      },
    });
  };

  return (
    <div className="text-center animate-slide-in">
      <h2 className="text-4xl font-bold text-accent">Welcome, Customer!</h2>
      <p className="text-lg text-gray-600 mt-4">Check out shops near you.</p>

      <div className="flex gap-8 justify-between p-8">
        <div className="flex-1 bg-base-100 rounded-lg p-8 shadow-md relative overflow-hidden">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            src="https://images.unsplash.com/photo-1616186137694-a5eee8926cf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hlYXQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
            alt="Background"
          />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              The Goodness of Our App
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience seamless transactions, fast delivery, and an intuitive
              user interface that enhances your shopping experience. Our app is
              designed with care to meet all your needs and exceed your
              expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHero;
