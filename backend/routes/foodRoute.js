import express from "express";
import multer from "multer";
import { addFood,listFood ,removeFood} from "../controllers/foodController.js";

const foodRouter = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "uploads", // Folder to store images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to ensure unique filenames
  },
});

// Multer middleware for handling file upload
const upload = multer({ storage: storage });

// POST route to add food
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get('/list',listFood)
foodRouter.post("/remove",removeFood)


export default foodRouter;
