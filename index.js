import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js";


import { userRoutes } from "./src/modules/user/user.routes.js";
import { orderRoutes } from "./src/modules/order/order.routes.js";
import { productRoutes } from "./src/modules/product/product.routes.js";
import { adminRoutes } from "./src/modules/admin/admin.routes.js";
import { categoryRoutes } from "./src/modules/category/category.routes.js";
import { userModel } from "./db/models/user.model.js"


dotenv.config();

const app = express();
app.use(express.json());


const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};


app.use("/users", userRoutes);
app.use("/orders", isAuth, orderRoutes);
app.use("/products", productRoutes);
app.use("/categories", isAuth, isAdmin, categoryRoutes);
app.use("/admin", isAuth, isAdmin, adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "running..." });
});


dbConnection().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
});
