import { Router } from "express";
import {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";

export const categoryRoutes = Router();

categoryRoutes.post("/category", addCategory);
categoryRoutes.get("/categories", getAllCategories);
categoryRoutes.put("/category/:id", updateCategory);
categoryRoutes.delete("/category/:id", deleteCategory);
