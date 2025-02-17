import { createSlice } from "@reduxjs/toolkit";

// Get token from cookies (if any)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    // Set user and token in the state and cookies
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;

      console.log("user", user);
    },

    logout: (state, action) => {
      // Perform logout via the backend (API call to remove token)
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
