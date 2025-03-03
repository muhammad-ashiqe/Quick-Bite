import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";


// login user 
const loginUser = async(req,res)=>{

    const {email,password}=req.body;

    try {
        const user =await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        const isMatch =await bcrypt.compare(password,user.password);

        if (! isMatch) {
            return res.json({success:false,message:"Invalid Credentials"})
        }

        //creating token 

        const token = createToken(user._id);
        return res.json(
            {success:true,token}
        )

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error})
    }
}




// creating a jwt token 
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if the email already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email" });
        }

        // Check password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create new user data
        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        
        // Return success with token
        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error during user registration:", error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }

};


export {loginUser,registerUser};