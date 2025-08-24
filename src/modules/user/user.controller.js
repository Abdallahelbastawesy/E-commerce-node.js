import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../utilities/Email/sendMail.js";



const getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.json({ message: "All Users", users });
};

const register = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const addedUser = await userModel.create(req.body);
  sendMail(req.body.email);
  addedUser.password = undefined;
  res.json({ message: "registered successfully", addedUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });



  res.json({
    message: "Login success",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  });
};


const verifyAccount = async (req, res) => {
  let { email } = req.params;

  jwt.verify(email, "NTIG13Mail", async (err, decoded) => {
    if (err) return res.json({ message: "invalid token", err });

    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { isConfirmed: true }
    );

    res.json({ message: "confirmed successfully" });
  });
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  res.json({ message: "updated successfully", updatedUser });
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "You cannot delete an admin user" });
    }

    const deletedUser = await userModel.findByIdAndDelete(id);

    res.json({ message: "deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};



const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const itemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }

  await user.save();
  res.json({ message: "Product added to cart", cart: user.cart });
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId).populate("cart.product");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ cart: user.cart });
};

const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const item = user.cart.find((item) => item.product.toString() === productId);
  if (!item)
    return res.status(404).json({ message: "Product not found in cart" });

  item.quantity = quantity;
  await user.save();

  res.json({ message: "Cart updated", cart: user.cart });
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.cart = user.cart.filter((item) => item.product.toString() !== productId);
  await user.save();

  res.json({ message: "Product removed from cart", cart: user.cart });
};

export {
  getAllUsers,
  updateUser,
  deleteUser,
  register,
  login,
  verifyAccount,
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
};
