import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import passport from "passport";
import { validateDTO } from "../middlewares/validateDTO.midleware.js";
import { userDTO } from "../DTO/user.dto.js";
const authRouter = Router();

authRouter.post("/login", passport.authenticate("login",{ session: false }),AuthController.login);
authRouter.get("/login-error", AuthController.loginError);
authRouter.post("/register",validateDTO(userDTO), AuthController.register);
authRouter.get("/profile", passport.authenticate("jwt",{ session: false }),AuthController.profile)
authRouter.get("/logout", AuthController.logout);

export default authRouter;
  