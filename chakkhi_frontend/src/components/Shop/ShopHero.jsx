import api, { ALL_SHOP_URL, PRODUCT_ORDERS_URL } from "@/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopHero = () => {
  const [orders, setorders] = useState([]);
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedShop = async () => {
      try {
        const response = await api.get(ALL_SHOP_URL, {
          withCredentials: true,
        });
        setShop(response.data.shop._id);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };
    fetchedShop();
  }, []);

  useEffect(() => {
    if (shop) {
      console.log("shop", shop);
      const fetchOrders = async () => {
        try {
          const response = await api.get(PRODUCT_ORDERS_URL, {
            params: {
              shop_id: shop,
            },
          });
          setorders(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [shop]);

  const handleOrderClick = () => {
    navigate("/shop-owner/orders");
  };

  const orderedData = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="text-center animate-slide-in">
      <h2 className="text-4xl font-bold text-accent">Welcome, Shop Owner!</h2>
      <p className="text-lg text-gray-600 mt-4">
        Manage your shop and confirm customer orders.
      </p>
      <div className="flex gap-8 md:justify-between p-8 justify-center mt-8">
        {/* Left Section */}
        <div className="hidden sm:block flex-1 relative bg-base-100 rounded-lg p-8 shadow-md">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1616186137694-a5eee8926cf0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hlYXQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.4,
              borderRadius: "12px",
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4 text-gold-200">
              The Goodness of Our App
            </h1>
            <p className="text-lg text-white leading-relaxed">
              Experience seamless transactions, fast delivery, and an intuitive
              user interface that enhances your shopping experience. Our app is
              designed with care to meet all your needs and exceed your
              expectations.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center border border-gray-300 rounded-lg p-8 shadow-md ">
          <div className="w-full">
            <h2 className="text-center text-white -800 text-3xl font-bold mb-6">
              Your Orders
            </h2>
            {orders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {orderedData.slice(0, 3).map(
                  (order) =>
                    order.paid && (
                      <div
                        key={order._id}
                        className="cursor-pointer"
                        onClick={handleOrderClick}
                      >
                        <div className="bg-white shadow-lg transition-transform hover:-translate-y-2 hover:shadow-xl rounded-xl p-4 md:p-6 border border-gray-200">
                          {/* Header */}
                          <div className="flex justify-between items-center">
                            <h3 className="text-gray-900 text-lg md:text-xl font-bold">
                              {order.product}
                            </h3>
                            <span
                              className={`px-3 py-1 text-sm font-medium rounded-full ${
                                order.paid
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {order.paid ? "Paid" : "Pending"}
                            </span>
                          </div>

                          {/* Order Details */}
                          <div className="mt-3 space-y-2 text-gray-700">
                            <p className="text-sm md:text-base">
                              <span className="font-semibold">Texture:</span>{" "}
                              {order.texture}
                            </p>
                            <p className="text-sm md:text-base">
                              <span className="font-semibold">Weight:</span>{" "}
                              {order.weight}kg
                            </p>
                            <p className="text-sm md:text-base">
                              <span className="font-semibold">Price:</span> $
                              {order.price}
                            </p>
                            <p
                              className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                                order.status === "all done"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              Status: {order.status}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="mt-4 flex justify-end">
                            <button className="bg-blue-500 text-white px-4 py-2 text-sm md:text-base rounded-lg hover:bg-blue-600 transition">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : (
              <p className="text-gray-500 mt-4 text-center">No orders found.</p>
            )}
            <div className="flex justify-center mt-8">
              <button className="btn btn-primary" onClick={handleOrderClick}>
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats shadow flex flex-col sm:flex-row sm:justify-around gap-4 p-4 sm:p-6">
        {/* Total Likes */}
        <div className="stat flex-1">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        {/* Page Views */}
        <div className="stat flex-1">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        {/* Tasks Done */}
        <div className="stat flex-1">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>

      {/* </div> */}
      <div className="flex justify-center mt-6 space-x-4">
        <button className="btn btn-secondary">Manage Orders</button>
        <button className="btn btn-accent">Add Product</button>
      </div>
    </div>
  );
};

export default ShopHero;
