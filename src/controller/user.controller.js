import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";

export class UserController {

    static async getAllUsersAsync(req,res) {
        try {
            const users = await UserService.getAllUsersAsync()
            res.json(users)

        } catch (error) {
            res.status(500).json({error: "Error al obtener los usuarios",details: error.message})
            
        }
    }

    static async getUserByIdAsync(req,res){
        try {
            const {uid} = req.params
            const users = await UserService.getUserByIdAsync(uid)

            res.json(users)
        } catch (error) {
            res.status(500).json({error: "Error al obtener el usuario",details: error.message})
            
        }
    }
    

    static async addUserAsync(req,res){
        try {
            const { first_name, last_name, email, age, password } = req.body;

            const user = await UserService.addUserAsync({first_name, last_name, email, age, password})

            res.json(user)

        } catch (error) {            
            
        }


    }

    static async updateUserAsync(req,res) {
        try {
            const {uid} = req.params
            const userToRemplace = req.body
    
            await UserService.updateUserAsync(uid,userToRemplace)
            
        } catch (error) {
            res.status(500).json({error: "error al actualizar el usuario",details:error.message})            
        }

    }

    static async deleteUserAsync (req,res) {
        try {

            uid = req.params
            return await ProductService.deleteUserAsync(uid)

        } catch (error) {
            
        }
    }











}
