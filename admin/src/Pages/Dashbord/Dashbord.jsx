import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./dashbord.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  // State for all data
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [orderStats, setOrderStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [foodStats, setFoodStats] = useState({ categories: [], monthlyAdditions: [] });

  // Base URL for API calls
  const BASE_URL = "https://quick-bite-backend.onrender.com";

  // Fetch all data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total users
      const usersResponse = await axios.get(`${BASE_URL}/api/dashbord/total-users`);
      setTotalUsers(usersResponse.data.totalUsers);

      // Fetch total customers
      const customersResponse = await axios.get(`${BASE_URL}/api/dashbord/total-customers`);
      setTotalCustomers(customersResponse.data.totalCustomers);

      // Fetch total products
      const productsResponse = await axios.get(`${BASE_URL}/api/dashbord/total-products`);
      setTotalProducts(productsResponse.data.totalProducts);

      // Fetch total sales
      const salesResponse = await axios.get(`${BASE_URL}/api/dashbord/total-sales`);
      setTotalSales(salesResponse.data.totalSales);

      // Fetch order statistics
      const orderStatsResponse = await axios.get(`${BASE_URL}/api/dashbord/order-stats`);
      setOrderStats(orderStatsResponse.data.statusStats);

      // Fetch recent orders
      const recentOrdersResponse = await axios.get(`${BASE_URL}/api/dashbord/recent-orders`);
      setRecentOrders(recentOrdersResponse.data.data);

      // Fetch user growth data
      const userGrowthResponse = await axios.get(`${BASE_URL}/api/dashbord/user-growth`);
      setUserGrowth(userGrowthResponse.data.growthStats);

      // Fetch food statistics
      const foodStatsResponse = await axios.get(`${BASE_URL}/api/dashbord/food-stats`);
      setFoodStats({
        categories: foodStatsResponse.data.categoryStats,
        monthlyAdditions: foodStatsResponse.data.monthlyStats,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error.response?.data || error.message);
    }
  };

  // Data for charts
  const orderStatusData = {
    labels: orderStats.map((stat) => stat._id),
    datasets: [
      {
        label: "Orders",
        data: orderStats.map((stat) => stat.count),
        backgroundColor: "rgba(235, 69, 18, 0.8)", // Orange-red
        borderColor: "rgba(235, 69, 18, 1)",
        borderWidth: 1,
      },
    ],
  };

  const userGrowthData = {
    labels: userGrowth.map((stat) => `Month ${stat._id}`),
    datasets: [
      {
        label: "User Growth",
        data: userGrowth.map((stat) => stat.count),
        borderColor: "rgba(235, 69, 18, 1)", // Orange-red
        backgroundColor: "rgba(235, 69, 18, 0.2)",
        fill: true,
      },
    ],
  };

  const foodCategoryData = {
    labels: foodStats.categories.map((stat) => stat._id),
    datasets: [
      {
        label: "Food Items",
        data: foodStats.categories.map((stat) => stat.count),
        backgroundColor: "rgba(235, 69, 18, 0.8)", // Orange-red
        borderColor: "rgba(235, 69, 18, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dash-container">
        
      {/* Stats Cards - Full Width */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="stat-card">
          <h2>Total Customers</h2>
          <p>{totalCustomers}</p>
        </div>
        <div className="stat-card">
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h2>Total Sales</h2>
          <p>${totalSales}</p>
        </div>
      </div>

      {/* Charts - Two Columns */}
      <div className="charts-grid">
        <div className="chart-column">
          <div className="chart-card">
            <h2>Order Status</h2>
            <Bar data={orderStatusData} />
          </div>
          <div className="chart-card">
            <h2>User Growth</h2>
            <Line data={userGrowthData} />
          </div>
        </div>
        <div className="chart-column">
          <div className="chart-card">
            <h2>Food Categories</h2>
            <Bar data={foodCategoryData} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.status}</td>
                <td>${order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </div>
  );
};

export default Dashboard;
