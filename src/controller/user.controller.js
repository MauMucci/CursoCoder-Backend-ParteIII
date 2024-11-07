import { MailService } from "../services/mail.service.js";
import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";
import { faker } from "@faker-js/faker";

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


            await MailService.sendMail({
                to:email,
                subject: "New user registered",
                html:`<h1>Nuevo usuario registrado</h1><p>Name: ${name}</p><p>Email:${email}</p><p>Phone: ${phone}</p>`,

            })

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
