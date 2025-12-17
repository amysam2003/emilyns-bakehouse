import { EmilynOrderModel } from "../models/emilynOrder.model.js";
import { EmilynProductModel } from "../models/emilynProduct.model.js";
export const createEmilynOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice = 0, taxPrice = 0, totalPrice, paymentResult } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Hello! No items in the order. Please add items first." });
    }
    const orderCustomer = {
      id: req.emilynUser.userId,
      fullName: req.body.customerFullName || req.body.fullName || req.emilynUser?.fullName || "Emilyn Customer",
      email: req.body.customerEmail || req.emilynUser?.email || "unknown@example.com",
    };
    const enrichedItems = await Promise.all(items.map(async (it) => {
      const prod = await EmilynProductModel.findById(it.productId);
      return {
        productId: it.productId,
        bakeryItemName: prod ? prod.bakeryItemName : it.bakeryItemName || "Unknown Item",
        bakeryItemPrice: it.price ?? (prod ? prod.bakeryItemPrice : 0),
        quantity: it.quantity ?? 1,
        bakeryItemImage: prod ? prod.bakeryItemImage : it.bakeryItemImage || "",
      };
    }));
    const emilynOrder = new EmilynOrderModel({
      customer: orderCustomer,
      items: enrichedItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid: paymentResult ? true : false,
      paidAt: paymentResult ? new Date() : null,
    });
    const createdOrder = await emilynOrder.save();
    return res.status(201).json({ message: "Order created successfully", order: createdOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};
export const getMyEmilynOrders = async (req, res) => {
  try {
    const userId = req.emilynUser.userId;
    const myOrders = await EmilynOrderModel.find({ "customer.id": userId }).sort({ createdAt: -1 });
    res.json(myOrders);
  } catch (error) {
    console.error("Get My Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
export const getEmilynOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await EmilynOrderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (req.emilynUser.role !== "admin" && req.emilynUser.userId !== String(order.customer.id)) {
      return res.status(403).json({ message: "Access denied to this order" });
    }
    res.json(order);
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    res.status(500).json({ message: "Failed to get order", error });
  }
};