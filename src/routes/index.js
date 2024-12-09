import { Router } from "express";
import { productsRouter } from "./products.router.js";
import { cartsRouter } from "./carts.router.js";
import userRouter from "./user.router.js";
import authRouter from "./auth.routes.js";
import { authenticate,authorizations } from "../middlewares/authorization.midlewares.js";
import mockRouter from "./mock.router.js";

import swaggerJSDoc from 'swagger-jsdoc';
import { serve,setup } from 'swagger-ui-express';
import opts from "../utils/swagger.utils.js";
const indexRouter = Router()

indexRouter.use('/auth',authRouter)
indexRouter.use('/carts',authenticate("jwt"),authorizations(["user"]),cartsRouter)
indexRouter.use('/products',productsRouter)
//indexRouter.use("/users",authenticate("jwt"),authorizations(["admin"]),userRouter)
indexRouter.use("/users",userRouter)
indexRouter.use('/mocks',mockRouter)


const specs = swaggerJSDoc(opts)
indexRouter.use('/doc', serve, setup(specs))


export default indexRouter