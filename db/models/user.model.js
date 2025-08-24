import mongoose, { Schema, model} from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    phone: Number,
    addres: {
      country: String,
      city: String,
      street: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = model("User", userSchema);
