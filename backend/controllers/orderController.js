
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // Update with your frontend URL

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd", // Ensure this is lowercase
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Convert to cents
            },
            quantity: item.quantity
        }));

        // Add delivery charge to line items
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 200 // Delivery fee in cents
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error creating order:", error);
        res.json({ success: false, message: "Error creating order" });
    }
};

const verifyOrder =async(req,res)=>{
    const {orderId,success} =req.body;

    try {
        if(success == 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"not paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

//users order for frontend

const userOrders =async(req,res)=>{
    try {
        const orders =await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

//listing order for admin panel
const listOrders=async(req,res)=>{
    try {
        const orders =await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:true,message:"Error"})
    }
}

//api for updating order status

const updateStatus =async(req,res)=>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"status updated"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}
}

export { placeOrder ,verifyOrder,userOrders,listOrders,updateStatus};

