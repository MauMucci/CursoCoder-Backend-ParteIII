import mongoose, { Schema,model } from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({      
    products:{
        type:[
            {
                product:{type:Schema.Types.ObjectId, ref:'products',required:true},
                quantity:{type:Number,required:true}
            }
        ],
        default:function(){
            return []
        }
    }
},
    {
        timestamps:true,

    }
)

const CartModel = mongoose.model(cartCollection,cartSchema)

export default CartModel