import foodModel from "../models/foodModel.js";
import fs from "fs"

// Add food function
const addFood = async (req, res) => {
  try {
    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//list foood items

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods }); // Send back the list of foods
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching food items" });
    }
};


// remove food 

const removeFood = async (req, res) => {
    try {
        // Log the incoming request body
        console.log("Request Body:", req.body);

        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);
        
        // Check if the food item exists
        if (!food) {
            console.error("Food item not found");
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Log the fetched food item
        console.log("Fetched Food Item:", food);

        // Attempt to delete the image file from the uploads directory
        const imagePath = `uploads/${food.image}`;
        console.log("Image Path:", imagePath);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
                return res.status(500).json({ success: false, message: "Error deleting image" });
            }

            // Only delete the food item after successfully deleting the image
            foodModel.findByIdAndDelete(req.body.id)
                .then(() => {
                    res.json({ success: true, message: "Food removed" });
                })
                .catch(deleteErr => {
                    console.error("Error deleting food item:", deleteErr);
                    res.status(500).json({ success: false, message: "Error removing food item" });
                });
        });
    } catch (error) {
        console.error("General error:", error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};


export { addFood,listFood,removeFood};
