import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { ProductController } from "../controller/product.controller.js";

const mockRouter = Router()


mockRouter.get('/', UserController.getAllUsersAsync)

mockRouter.get('/user', UserController.addMockUserAsync)
mockRouter.get('/users/:quantity', UserController.addManyMockUsersAsync)


mockRouter.get('/product', ProductController.addMockProductAsync)
mockRouter.get('/products/:quantity', ProductController.addManyMocksProductsAsync)


export default mockRouter 