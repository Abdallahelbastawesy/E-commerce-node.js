
import { userModel } from "../../../db/models/user.model.js";
import { productModel } from "../../../db/models/product.model.js";
import { orderModel } from "../../../db/models/order.model.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user")
      .populate("products.product");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await orderModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
