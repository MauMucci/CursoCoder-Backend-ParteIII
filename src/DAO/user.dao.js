import { userModel } from "../Mongo/Models/user.model.js";

export class UserDao {
    
    static async getAllUsersAsync(){
        return await userModel.find()
    }

    static async getUserByEmailAsync(email){
        return await userModel.findOne(email)
    }

    static async addUserAsync(user){
        return await userModel.save(user)
    }
    
    
    static async deleteUserAsync(uid){
        return await userModel.deleteOne(uid)
    }
}