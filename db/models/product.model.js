import mongoose, { Schema, model} from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: String,
    images: [String],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        star: { type: Number, min: 1, max: 5 },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

export const productModel = model("Product", productSchema);
