import userModel from "../models/userModel.js"


//add to cart fuction 

const addToCart =async(req,res)=>{

    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }else{
            cartData[req.body.itemId] +=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added to Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
//add to cart fuction 


const removefromCart =async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"removed From cart"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"error"})
    }
}
//add to cart fuction 

const getCart =async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"failed"})
    }
}

export {addToCart,removefromCart,getCart}

