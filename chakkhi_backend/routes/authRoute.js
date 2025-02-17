import { Router } from "express";

const authRoutes = Router();

import * as authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.post("/shopCreate", authController.ShopCreation);
authRoutes.get("/isLogged", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default authRoutes;
