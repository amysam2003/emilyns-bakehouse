import { EmilynOrderModel } from "../models/emilynOrder.model.js";
import { EmilynUserModel } from "../models/emilynUser.model.js";
export const getEmilynAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await EmilynUserModel.countDocuments();
    const totalOrders = await EmilynOrderModel.countDocuments();
    const paidOrders = await EmilynOrderModel.find({ isPaid: true });
    const totalSales = paidOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysOrders = await EmilynOrderModel.countDocuments({
      createdAt: { $gte: today }
    });
    const recentOrders = await EmilynOrderModel.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customer totalPrice isPaid createdAt");
    res.json({
      summary: {
        totalUsers,
        totalOrders,
        totalSales,
        todaysOrders
      },
      recentOrders
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({
      message: "Failed to load admin analytics. Please try again later.",
      error
    });
  }
};