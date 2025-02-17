import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "./store/authSlice";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import LandingPage from "./pages/LandingPage";
import ViewShops from "./pages/ViewShops";
import ShopOrders from "./pages/ShopOrders";
import ShopDetails from "./components/Shop/ShopDetails";
import Login from "./pages/Login";
import Layout from "./Layout";
import api, { ISLOGOUT_URL } from "./api";

function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isAuthenticated) {
      const checkAuth = async () => {
        try {
          const response = await api.get(ISLOGOUT_URL, {
            withCredentials: true,
          });
          const { user } = response.data;
          if (user) {
            dispatch(setUser({ user, isAuthenticated: true }));
          }
        } catch (error) {
          console.error("Authentication failed", error);
        } finally {
          setAuthChecked(true);
        }
      };

      checkAuth();
    } else {
      setAuthChecked(true);
    }
  }, [dispatch, isAuthenticated, user]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/customer/shop"
          element={
            <ProtectedRoute roles={["customer"]}>
              <ViewShops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/shop/check-shop/:shop_id"
          element={
            <ProtectedRoute roles={["customer"]}>
              <ShopDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-owner/orders"
          element={
            <ProtectedRoute roles={["shop_owner"]}>
              <ShopOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>
    </Routes>
  );
}

export default App;
