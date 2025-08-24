import { Router } from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} from "./order.controller.js";

export const orderRoutes = Router();
orderRoutes.post("/order", createOrder);
orderRoutes.get("/orders/:userId", getUserOrders);
orderRoutes.put("/order/status", updateOrderStatus);
