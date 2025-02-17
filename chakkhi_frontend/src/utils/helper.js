import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

const login = async (credentials) => {
  const dispatch = useDispatch();

  try {
    const response = await axios.post("/api/auth/login", credentials);
    const { token, user } = response.data; // Assume server response has token and user data

    // Save token to localStorage or session storage if needed
    localStorage.setItem("token", token);

    // Update Redux store
    dispatch(setUser({ user, token }));
  } catch (error) {
    console.error("Login failed", error);
  }
};
