import api, { ALL_SHOP_URL, ORDER_STATUS_URL, PRODUCT_ORDERS_URL } from "@/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrders = () => {
  const [orders, setOrders] = useState([]);
  const [shop, setShop] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await api.get(ALL_SHOP_URL, {
          withCredentials: true,
        });
        setShop(response.data.shop._id);
        console.log("Shop ID:", response.data.shop._id);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    };
    fetchShop();
  }, [orders]);

  useEffect(() => {
    if (shop) {
      const fetchOrders = async () => {
        try {
          const response = await api.get(PRODUCT_ORDERS_URL, {
            params: { shop_id: shop },
          });
          setOrders(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchOrders();
    }
  }, [shop, selectedOrder]);

  const orderedData = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (newStatus === "All Done") {
      setSelectedOrder((prevOrder) => ({
        ...prevOrder,
        paid: true,
      }));
    }
    setSelectedOrder((prevOrder) => ({
      ...prevOrder,
      status: newStatus,
    }));
  };

  const handleConfirmClick = async () => {
    try {
      const response = await api.put(ORDER_STATUS_URL, {
        order_id: selectedOrder._id,
        status: selectedOrder.status,
      });
      console.log("Order status updated:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: selectedOrder.status }
            : order
        )
      );
    } catch (error) {
      console.error("Error confirming order status:", error);
    }
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Orders List */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold text-accent mb-4">
          Manage your Orders!
        </h2>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {orderedData.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="card-body">
                  <h3 className="card-title">{order.product}</h3>
                  <p className="text-sm">Texture: {order.texture}</p>
                  <p className="text-sm">Weight: {order.weight}kg</p>
                  <p className="text-sm">Price: ${order.price}</p>
                  <div className="badge badge-outline">
                    {order.paid ? "Paid" : "Pending"}
                  </div>
                  <p className="text-gray-500 text-sm">
                    Status: {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4 text-center">No orders found.</p>
        )}
      </div>

      {/* Selected Order Details */}
      <div className="flex-1 bg-gray-800 text-white rounded-lg p-6 shadow-lg">
        {selectedOrder ? (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Order Details: {selectedOrder.product}
            </h2>
            <p>Texture: {selectedOrder.texture}</p>
            <p>Weight: {selectedOrder.weight}kg</p>
            <p>Price: ${selectedOrder.price}</p>
            <p>Status: {selectedOrder.status}</p>
            <p>Paid: {selectedOrder.paid ? "Yes" : "No"}</p>

            <div className="mt-6">
              <label className="block mb-2">Update Status</label>
              <select
                className="select select-bordered w-full text-black"
                value={selectedOrder.status}
                onChange={handleStatusChange}
              >
                <option value="Processing">Processing</option>
                <option value="Ready to pick">Ready to Pick</option>
                <option value="All Done">All Done</option>
              </select>
            </div>
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            Select an order to view details
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateOrders;
