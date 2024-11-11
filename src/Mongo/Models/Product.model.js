import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String },
    code: { type: String },
    stock: { type: Number }, 
    price: { type: Number }, 
    category: {type:String},
    status: { type: Boolean }, 
});


productSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model(productCollection,productSchema)


