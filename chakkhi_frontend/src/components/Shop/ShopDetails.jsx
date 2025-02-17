import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import api, { SHOP_PRODUCT_ORDERS_URL } from "@/api";

const ShopDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedTexture, setSelectedTexture] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isTextureOpen, setIsTextureOpen] = useState(false);
  const { shop_id } = useParams();
  // console.log("Extracted shop_id:", shop_id);

  // Handle weight input change with validation
  const handleWeightChange = (e) => {
    const value = e.target.value;
    setWeight(value);

    if (!/^[0-9]+$/.test(value)) {
      setError("Weight must be a valid positive number.");
    } else if (parseInt(value, 10) <= 0) {
      setError("Weight must be greater than 0.");
    } else {
      setError("");
    }
  };

  // Handle Place Order Button Click
  const handlePlaceOrder = async () => {
    setMessage("");
    if (!selectedProduct || !selectedTexture || !weight || error) {
      setMessage(
        "Please fill in all fields correctly before placing the order."
      );
      return;
    }

    try {
      const url = await SHOP_PRODUCT_ORDERS_URL(shop_id);
      const response = await api.post(
        url,
        {
          product: selectedProduct,
          texture: selectedTexture,
          weight: parseInt(weight, 10),
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setMessage(
          "Order placed successfully! Thank you for shopping with us."
        );
        setSelectedProduct("");
        setSelectedTexture("");
        setWeight("");
      } else {
        setMessage("Failed to place the order. Please try again later.");
      }
    } catch (error) {
      setMessage(
        "An unexpected error occurred. Please check your network or contact support."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <motion.div
        className="card bg-gray-900 shadow-2xl p-6 rounded-2xl w-full max-w-md border border-yellow-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-yellow-500 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Shop Details
        </motion.h1>

        {/* Product Dropdown */}
        <div className="dropdown dropdown-bottom mb-6">
          <motion.div
            tabIndex={0}
            role="button"
            className="btn btn-outline btn-lg w-full text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProductOpen(!isProductOpen)}
          >
            {selectedProduct || "Select Product"}
          </motion.div>
          {isProductOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 text-yellow-500 rounded-lg z-10 w-full p-2 shadow-lg border border-yellow-500"
            >
              {["wheat", "corn", "barley", "other"].map((item) => (
                <li key={item}>
                  <a
                    className="hover:text-yellow-300"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsProductOpen(false);
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Weight Input */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="Enter product weight (in kg)"
            value={weight}
            onChange={handleWeightChange}
            className={`input input-bordered w-full text-white bg-gray-800 border ${
              error ? "border-red-500" : "border-yellow-500"
            } focus:ring-2 focus:ring-yellow-500`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </motion.div>

        {/* Texture Dropdown */}
        <div className="dropdown dropdown-bottom mb-6">
          <motion.div
            tabIndex={0}
            role="button"
            className="btn btn-outline btn-lg w-full text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTextureOpen(!isTextureOpen)}
          >
            {selectedTexture || "Select Texture"}
          </motion.div>
          {isTextureOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 text-yellow-500 rounded-lg z-10 w-full p-2 shadow-lg border border-yellow-500"
            >
              {["highly crushed", "medium", " coarse"].map((item) => (
                <li key={item}>
                  <a
                    className="hover:text-yellow-300"
                    onClick={() => {
                      setSelectedTexture(item);
                      setIsTextureOpen(false);
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Place Order Button */}
        <motion.button
          onClick={handlePlaceOrder}
          className="btn btn-block bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Place Order
        </motion.button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-yellow-500">{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ShopDetails;
