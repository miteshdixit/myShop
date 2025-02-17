import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getFilteredShops } from "../controllers/shop.controller.js";

const shopRoutes = Router();

shopRoutes.get("/all", getFilteredShops);

export default shopRoutes;
