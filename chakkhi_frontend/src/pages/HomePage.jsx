import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerScreen from "../components/CustomerScreen";
import AdminScreen from "../components/AdminScreen";
import ShopOwnerScreen from "@/components/Shop/ShopOwnerScreen";
import Login from "./Login";

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Render content based on user role
  const renderRoleContent = () => {
    if (!user) return navigate("/login");

    switch (user.role) {
      case "customer":
        return <CustomerScreen />;
      case "shop_owner":
        return <ShopOwnerScreen />;
      case "admin":
        return <AdminScreen />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="container mx-auto px-8 py-6 pb-0">
      <div className="mt-6 mb-8">{renderRoleContent()}</div>
    </div>
  );
};

export default HomePage;
