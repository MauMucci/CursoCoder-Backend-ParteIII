import { userModel } from "../Mongo/Models/user.model.js";

export class UserDao {
    
    static async getAll(){
        return await userModel.find()
    }

    static async getById(id){
        return await userModel.getById(id)
    }
    
    static async createUser(user) {
        return await userModel.create(user)
    }
}