import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrderToShop,
  orderStatus,
} from "../controllers/order.controller.js";

const productRoutes = Router();

productRoutes.post("/order/:shop_id", authMiddleware, createOrder);

productRoutes.get("/orders", getAllOrderToShop);

productRoutes.put("/orders/status", orderStatus);

export default productRoutes;
