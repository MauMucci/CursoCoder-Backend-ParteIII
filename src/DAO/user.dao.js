import { userModel } from "../Mongo/Models/user.model.js";
import { mockUserModel } from "../Mongo/Models/mockUser.model.js";

export class UserDao {
    
    static async getAllUsersAsync(){
        return await userModel.find()
    }

    static async getUserByIdAsync(id) {
        const user = await userModel.findById(id);
        return user;
    }
    

    static async addUserAsync(user){
        const newUser = new userModel(user); // Crear una nueva instancia de userModel
        return await newUser.save(); // Guardar la instancia
    }
    
    static async updateUserAsync(id,userToUpdate){
        return await userModel.findByIdAndUpdate(id, userToUpdate)

    }
    static async deleteUserAsync(id){
        return await userModel.deleteOne({_id:id})
    }
    
    //MOCK
    static async addMockUserAsync(user){
        const newUser = new mockUserModel(user); // Crear una nueva instancia de userModel
        return await newUser.save(); // Guardar la instancia
    }

    static async addManyMockUsersAsync(users){
        return await mockUserModel.insertMany(users)
    }
    
    
}