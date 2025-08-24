import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("DB connection error:", err));
};
