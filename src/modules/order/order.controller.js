import { userModel } from "../../../db/models/user.model.js";
import { orderModel } from "../../../db/models/order.model.js";


const createOrder = async (req, res) => {
  const { userId } = req.body;

  const user = await userModel.findById(userId).populate("cart.product");
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.cart.length === 0)
    return res.status(400).json({ message: "Cart is empty" });


  const newOrder = await orderModel.create({
    user: user._id,
    items: user.cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price, 
    })),
  });


  user.cart = [];
  await user.save();

  res.json({ message: "Order created successfully", order: newOrder });
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await orderModel
      .find({ user: userId })
      .populate("items.product");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; 

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};


export { createOrder, getUserOrders, updateOrderStatus };

