import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get("/", UserController.getAllUsersAsync);
userRouter.get("/:id", UserController.getUserByIdAsync);
userRouter.delete("/:id", UserController.deleteUserAsync);
userRouter.put("/:id", UserController.updateUserAsync);

export default userRouter;
