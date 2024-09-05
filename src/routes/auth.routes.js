import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("login"),AuthController.login);

authRouter.get("/login-error", AuthController.loginError);

authRouter.post("/register", AuthController.register);

authRouter.get("/profile", passport.authenticate("jwt"),AuthController.profile);

authRouter.get("/logout", AuthController.logout);

export default authRouter;
