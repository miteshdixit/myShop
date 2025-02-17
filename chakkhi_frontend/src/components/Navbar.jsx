import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaEllipsisV } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"; // Use NavLink to track active
import { logout } from "../store/authSlice";
import api, { LOGOUT_URL } from "@/api";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log(isAuthenticated, user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle login/logout
  const handleAuth = async () => {
    if (isAuthenticated) {
      try {
        await api.post(LOGOUT_URL);
        dispatch(logout());
        navigate("/login");
      } catch (error) {
        console.error("Logout failed", error);
      }
    } else {
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  console.log(user);

  return (
    <div
      className={`navbar bg-dark text-white  shadow-lg rounded-lg mb-12 transition-all duration-500 ease-in-out fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-md fade-in `}
      style={{
        zIndex: 1000,
        backgroundColor: "#212121",
      }}
    >
      <div className=" mx-3 px-4 py-2 flex-1  items-center justify-between ">
        <h1 className="text-3xl font-bold animate-pulse mr-4">MyShop</h1>

        <div className="flex space-x-6 items-end">
          <nav className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ease-in-out ${
                  isActive
                    ? "text-accent font-bold border-b-2 border-magenta-500"
                    : ""
                }`
              }
            >
              Home
            </NavLink>

            {user?.role === "customer" ? (
              <NavLink
                to="/customer/shop"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition duration-200 ease-in-out ${
                    isActive
                      ? "text-accent font-bold border-b-2 border-magenta-500"
                      : ""
                  }`
                }
              >
                shops
              </NavLink>
            ) : (
              <NavLink
                to="/add-product"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition duration-200 ease-in-out ${
                    isActive
                      ? "text-accent font-bold border-b-2 border-magenta-500"
                      : ""
                  }`
                }
              >
                Add Product
              </NavLink>
            )}
            <NavLink
              to="/shop-owner/orders"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ease-in-out ${
                  isActive
                    ? "text-accent font-bold border-b-2 border-magenta-500"
                    : ""
                }`
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `hover:text-gray-300 transition duration-200 ease-in-out ${
                  isActive
                    ? "text-accent font-bold border-b-2 border-magenta-500"
                    : ""
                }`
              }
            >
              History
            </NavLink>
          </nav>
        </div>
        <div className="relative">
          {isAuthenticated ? (
            <button
              className="btn btn-sm gap-2 bg-transparent text-white hover:text-gray-300"
              onClick={toggleDropdown}
            >
              <FaEllipsisV />
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm gap-2"
              onClick={handleAuth}
            >
              <FaSignInAlt />
              Login
            </button>
          )}

          {isAuthenticated && isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 text-white p-2 rounded-md shadow-lg w-40">
              <button
                className="block w-full text-left p-2 hover:bg-gray-700"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                className="block w-full text-left p-2 hover:bg-gray-700"
                onClick={() => navigate("/settings")}
              >
                Settings
              </button>
              <button
                className="block w-full text-left p-2 hover:bg-gray-700"
                onClick={handleAuth}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
