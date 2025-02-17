import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import * as userController from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/profile", authMiddleware, userController.getUserProfile);

userRoute.get(
  "/admin-dashboard",
  [authMiddleware, roleMiddleware(["admin"])],
  (req, res) => {
    res.status(200).json({ message: "Welcome to Admin Dashboard" });
  }
);
userRoute.get(
  "/customer-dashboard",
  authMiddleware,
  roleMiddleware(["customer"]),

  (req, res) => {
    res.status(200).json({ message: "Welcome to the Customer Dashboard" });
  }
);
userRoute.get(
  "/shop-owner-dashboard",
  authMiddleware,
  roleMiddleware(["shop_owner"]),

  (req, res) => {
    res.status(200).json({ message: "Welcome to the Customer Dashboard" });
  }
);

userRoute.get(
  "/shop",
  authMiddleware,
  roleMiddleware(["shop_owner"]),
  userController.getShopOfUser
);
export default userRoute;
