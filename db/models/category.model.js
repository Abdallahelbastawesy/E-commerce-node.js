import mongoose, { Schema, model } from "mongoose";
const categorySchema = new Schema(
  {
    name: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const categoryModel = model("Category", categorySchema);
