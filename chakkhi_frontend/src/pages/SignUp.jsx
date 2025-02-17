import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShopOwnerForm from "../components/Shop/ShopOwnerForm";
import api, { USER_SIGNUP_URL } from "@/api";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [next, setNext] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(USER_SIGNUP_URL, {
        username,
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  };

  const handleShopDetails = () => {
    setNext(true);
  };

  // If role is "shop_owner" and user clicked "Next", show the ShopOwnerForm
  if (role === "shop_owner" && next) {
    return (
      <ShopOwnerForm
        username={username}
        email={email}
        password={password}
        role={role}
      />
    );
  }

  return (
    <div className="card w-full max-w-md bg-white shadow-md border border-gray-300">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center text-gray-700">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-700">USER NAME</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your UserName"
              className="input input-bordered bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-700">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-700">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-700">Role</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="shop_owner">Shop Owner</option>
            </select>
          </div>
          <div className="form-control">
            {role === "shop_owner" && !next ? (
              <button
                type="button"
                className="btn btn-primary btn-block bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleShopDetails}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-block bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
