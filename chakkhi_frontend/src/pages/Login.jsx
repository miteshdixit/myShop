import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api, { USER_LOGIN_URL } from "@/api";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        USER_LOGIN_URL,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { user } = response.data;
      const token = Cookies.get("token");

      if (token) {
        dispatch(setUser({ user }));
      } else {
        console.error("Token not found in cookies");
      }

      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="card w-full max-w-sm shadow-2xl bg-white border border-gray-300 rounded-lg animate-fadeIn">
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-lg"
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
                className="input input-bordered bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-lg"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                className="btn btn-primary btn-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
