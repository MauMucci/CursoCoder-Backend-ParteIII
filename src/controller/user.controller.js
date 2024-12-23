import { MailService } from "../services/mail.service.js";
import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";
import { faker } from "@faker-js/faker";
import winstonLogger from "../utils/winston.utils.js";
import { userModel } from "../Mongo/Models/user.model.js";

export class UserController {

    static async getAllUsersAsync(req,res) {
        try {
            const users = await UserService.getAllUsersAsync()
            //aplico winstone.info
            winstonLogger.info(users)
            console.log("Estamos dentro de getAllUsers")


            res.json(users)

        } catch (error) {
            res.status(500).json({error: "Error al obtener los usuarios",details: error.message})
            
        }
    }



    static async getUserByIdAsync(req,res){
        
        const { id } = req.params
        try {

            const cleanedId = id.trim()
            console.log(cleanedId)
            const user = await UserService.getUserByIdAsync(cleanedId)
            console.log("Estamos dentro de getUserByIdAsync")
            
            res.json(user)
        } catch (error) {
            res.status(500).json({error: "Error al obtener el usuario",details: error.message})
            
        }
    }
    

    static async addUserAsync(req,res){
        try {
            const { first_name, last_name, email, age, password } = req.body;

            const user = await UserService.addUserAsync({first_name, last_name, email, age, password})


            // await MailService.sendMail({
            //     to:email,
            //     subject: "New user registered",
            //     html:`<h1>Nuevo usuario registrado</h1><p>Name: ${name}</p><p>Email:${email}</p><p>Phone: ${phone}</p>`,

            // })

            return res.status(201).json({response:user,message:"USUARIO CREADO"})

        } catch (error) {            
            
        }
    }

    static async updateUserAsync(req, res) {
        try {
            const { id } = req.params;
            const userToReplace = req.body;
            const updatedUser = await UserService.updateUserAsync(id, userToReplace);
    
            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
    
            return res.status(200).json({ message: "Usuario actualizado", data: updatedUser });
        } catch (error) {
            if (error.message.includes("ObjectId válido")) {
                // Maneja IDs no válidos como un error 400
                return res.status(400).json({ error: "ID inválido", details: error.message });
            }
    
            res.status(500).json({ error: "Error al actualizar el usuario", details: error.message });
        }
    }
    
    static async deleteUserAsync(req, res) {
        const { id } = req.params;
        try {
            console.log(id);
    
            const cleanedId = id.trim();
            await UserService.deleteUserAsync(cleanedId);
    
            return res.status(200).json({ message: "Usuario eliminado exitosamente" });
        } catch (error) {
            return res.status(500).json({ error: "Error al eliminar el usuario", details: error.message });
        }
    }
    


    //MOCK
    static async addMockUserAsync (req,res) {
        try {

            const mockUser = {
                first_name: faker.person.firstName().toLowerCase(),
                last_name:faker.person.lastName().toLowerCase(),
                email:`${first_name}${last_name}@coder.com`,
                age: faker.number.int({ min: 18, max: 100 }),
                password: faker.internet.password()
            }

            await UserService.addMockUserAsync(mockUser)

            return res.status(201).json({response: mockUser ,message:"USUARIO MOCK CREADO"})
            
        } catch (error) {
            return res.status(500).json({ error: "Error al crear usuario mock", details: error.message });
        }
        
    }

    static async addManyMockUsersAsync(req,res) {
        
        try {
            const {quantity} = req.params
            const users = []

            for(let i=0; i<= quantity; i++){
                    
                const user = {
                    first_name: faker.person.firstName().toLowerCase(),
                    last_name:faker.person.lastName().toLowerCase(),
                    email:`${first_name}${last_name}@coder.com`,
                    age: faker.number.int({ min: 18, max: 100 }),
                    password: faker.internet.password()
                }

                users.push(user)
            }

            await UserService.addManyMockUsersAsync(users)
            res.status(201).json({ message: `${quantity} usuarios mock creados y guardados en la base de datos` });
            
        } catch (error) {
            res.status(500).json({ error: "Error al crear usuarios mock", details: error.message });
            
        }
    }

}
