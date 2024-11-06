import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
    password:{type:String,required:true},
    
})


export const mockUserModel = mongoose.model("mockUser",userSchema)
