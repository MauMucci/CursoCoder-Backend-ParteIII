import { UserDao } from "../DAO/user.dao.js";

export class UserService {

    static async getAll(){
        return await UserDao.getAll()
    }

    static async getById(id){
        return await UserDao.getById(id)
    }

    static async create(user){
        return await UserDao.createUser(user)
    }
}