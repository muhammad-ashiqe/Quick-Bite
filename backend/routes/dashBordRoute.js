import express from "express";

import {
  foodStats,
  orderStats,
  recentOrders,
  totalCustomers,
  totalProducts,
  totalSales,
  totalUsers,
  userGrowth,
} from "../controllers/dashBordController.js";

const DashboardRouter = express.Router();

// Dashboard Routes
DashboardRouter.get("/total-users", totalUsers);
DashboardRouter.get("/total-customers", totalCustomers);
DashboardRouter.get("/total-products", totalProducts);
DashboardRouter.get("/total-sales", totalSales);
DashboardRouter.get("/order-stats", orderStats);
DashboardRouter.get("/recent-orders", recentOrders);
DashboardRouter.get("/user-growth", userGrowth);
DashboardRouter.get("/food-stats", foodStats);

export default DashboardRouter;
