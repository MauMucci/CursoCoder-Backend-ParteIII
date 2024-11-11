import { Router } from "express";
import { productsRouter } from "./products.router.js";
import { cartsRouter } from "./carts.router.js";
import userRouter from "./user.router.js";
import authRouter from "./auth.routes.js";
import { authenticate,authorizations } from "../middlewares/authorization.midlewares.js";
import mockRouter from "./mock.router.js";

const indexRouter = Router()

indexRouter.use('/auth',authRouter)
indexRouter.use('/carts',authenticate("jwt"),authorizations(["user"]),cartsRouter)
indexRouter.use('/products',productsRouter)
indexRouter.use("/users",authenticate("jwt"),authorizations(["admin"]),userRouter)
indexRouter.use('/mocks',mockRouter)

export default indexRouter