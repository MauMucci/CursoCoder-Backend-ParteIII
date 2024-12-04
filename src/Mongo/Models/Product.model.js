import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, min: 0 },
    thumbnail: { type: String, required: true, min: 0 },
    code: { type: String,required: true },
    stock: { type: Number }, 
    price: { type: Number }, 
    category: {type:String},
    status: { type: Boolean }, 
});


productSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model(productCollection,productSchema)


