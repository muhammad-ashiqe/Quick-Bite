import mongoose from "mongoose";


export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://muhammadashiqe007:iCow1JKDvH2aIRgj@cluster0.idkcq.mongodb.net/quikbite').then(()=>{
        console.log("db connected...");
    })
}
