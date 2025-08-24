import { Router } from "express";
import {
  verifyAccount,
  deleteUser,
  getAllUsers,
  updateUser,
  register,
  login,
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} from "./user.controller.js";

import { checkEmail } from "../../middleware/checkEmail.js";

export const userRoutes = Router();


userRoutes.get("/", getAllUsers);
userRoutes.put("/user/:id", updateUser);
userRoutes.post("/", checkEmail, register);
userRoutes.post("/user/login", login);
userRoutes.delete("/user/:id", deleteUser);
userRoutes.get("/user/verify/:email", verifyAccount);


userRoutes.post("/user/cart", addToCart);
userRoutes.get("/user/:userId/cart", getCart);
userRoutes.put("/user/cart", updateCartItem);
userRoutes.delete("/user/cart", removeFromCart);
