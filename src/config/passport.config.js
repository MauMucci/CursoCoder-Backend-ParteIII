import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";
import { userModel } from "../Mongo/Models/user.model.js";
import { verifyPassword } from "../utils/hashFunctions.js";
import { envConfig } from "./env.config.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function initializePassport() {

  // Login Strategy
  passport.use("login",new LocalStrategy({usernameField: "email",},
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }

          console.log(`usuario encontrado: ${user._id}`)

          const isPasswordCorrect = await verifyPassword(password,user.password);

          if (!isPasswordCorrect) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);
          
        } catch (error) {
          console.log(error);
          return done(`Hubo un error: ${error.message}`);
        }
      }
    )
  );

  
  // JWT Strategy
  passport.use("jwt",new JWTStrategy({jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),secretOrKey: envConfig.JWT_SECRET,},
  
      async (payload, done) => {
        console.log("Payload JWT:", payload); 
        try {
          done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

function cookieExtractor(req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  //console.log("cookieExtractor", token); 
  return token;
}

export { initializePassport };
