import { Router } from "express";
import authController from "../controller/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/login", 
  passport.authenticate("login",{session: false,failureRedirect: "/api/auth/login-error"}),
  authController.login);

authRouter.get("/login-error", authController.loginError);

authRouter.post("/register", authController.register);

authRouter.get("/profile", passport.authenticate("jwt", { session: false }),authController.profile);

authRouter.get("/logout", authController.logout);

export default authRouter;
