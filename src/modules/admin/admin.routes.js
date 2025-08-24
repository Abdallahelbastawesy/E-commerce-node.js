// src/modules/admin/admin.routes.js
import { Router } from "express";
import {
  getAllUsers,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllOrders,
  deleteOrder,
} from "./admin.controller.js";

export const adminRoutes = Router();


adminRoutes.get("/users", getAllUsers);
adminRoutes.delete("/users/:id", deleteUser);


adminRoutes.get("/products", getAllProducts);
adminRoutes.delete("/products/:id", deleteProduct);


adminRoutes.get("/orders", getAllOrders);
adminRoutes.delete("/orders/:id", deleteOrder);
