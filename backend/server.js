import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import fs from 'fs';
import userRoute from './routes/userRoute.js';
import cartRouter from './routes/cartroute.js';
import "dotenv/config.js"
import orderRouter from './routes/orderRoute.js';
import DashboardRouter from './routes/dashBordRoute.js';


dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Database connection
connectDB();

// API routes
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRoute);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use('/api/dashbord',DashboardRouter)

app.get('/', (req, res) => {
  res.send("API is working ...!");
});

// Catch undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Start server after database connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
