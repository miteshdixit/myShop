import { Router } from "express";
import authRoutes from "./authRoute.js";
import productRoutes from "./productRoute.js";
import userRoute from "./userRoute.js";
import shopRoutes from "./shopRoute.js";

const appRouter = Router();

appRouter.use("/user/auth", authRoutes);
appRouter.use("/product", productRoutes);
appRouter.use("/user", userRoute);
appRouter.use("/shop", shopRoutes);

export default appRouter;
