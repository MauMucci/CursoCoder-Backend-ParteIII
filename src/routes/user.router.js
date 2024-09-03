import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { authorizations } from "../middlewares/authorization.midlewares.js";
const userRouter = Router();

userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);
userRouter.delete("/:id", UserController.delete);
userRouter.put("/:id", UserController.update);

export default userRouter;
