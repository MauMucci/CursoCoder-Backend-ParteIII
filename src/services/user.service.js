import { UserDao } from "../DAO/user.dao.js";

export class UserService {

    static async getAllUsersAsync(){
        return await UserDao.getAllUsersAsync()
    }

    static async getUserByIdAsync(uid){
        return await UserDao.getUserByIdAsync(uid)
    }


    static async addUserAsync(user){
        return await UserDao.addUserAsync(user)
    }

    static async addMockUserAsync(mockUser){
        return await UserDao.addMockUserAsync(mockUser)
    }

    static async addManyMockUsersAsync(mockUsers){
        return await UserDao.addManyMockUsersAsync(mockUsers)
    }


    static async deleteUserAsync(uid){
        return await UserDao.deleteUserAsync(uid)
    }
}