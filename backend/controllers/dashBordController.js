import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";

// Total Users
const totalUsers = async (req, res) => {
  try {
    const total = await userModel.countDocuments();
    res.status(200).json({ success: true, totalUsers: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching total users" });
  }
};

// Total Customers (users who placed at least one order)
const totalCustomers = async (req, res) => {
  try {
    const total = await orderModel.distinct("userId").countDocuments();
    res.status(200).json({ success: true, totalCustomers: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching total customers" });
  }
};

// Total Products
const totalProducts = async (req, res) => {
  try {
    const total = await foodModel.countDocuments();
    res.status(200).json({ success: true, totalProducts: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching total products" });
  }
};

// Total Sales
const totalSales = async (req, res) => {
  try {
    const orders = await orderModel.find({ payment: true }); // Only paid orders
    const total = orders.reduce((sum, order) => sum + order.amount, 0);
    res.status(200).json({ success: true, totalSales: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching total sales" });
  }
};

// Order Statistics
const orderStats = async (req, res) => {
  try {
    // Orders by status
    const statusStats = await orderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly sales
    const monthlyStats = await orderModel.aggregate([
      {
        $match: { payment: true }, // Only paid orders
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    res.status(200).json({ success: true, statusStats, monthlyStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching order statistics" });
  }
};

// Recent Orders
const recentOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 }).limit(10); // Last 10 orders
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching recent orders" });
  }
};

// User Growth
const userGrowth = async (req, res) => {
  try {
    const growthStats = await userModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          count: { $sum: 1 }, // Count users per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);
    res.status(200).json({ success: true, growthStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching user growth data" });
  }
};

// Food Statistics
const foodStats = async (req, res) => {
  try {
    // Food items by category
    const categoryStats = await foodModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly food additions
    const monthlyStats = await foodModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    res.status(200).json({ success: true, categoryStats, monthlyStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching food statistics" });
  }
};

export {
  totalUsers,
  totalCustomers,
  totalProducts,
  totalSales,
  orderStats,
  recentOrders,
  userGrowth,
  foodStats,
};