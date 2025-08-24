import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

export const productRoutes = Router();
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
