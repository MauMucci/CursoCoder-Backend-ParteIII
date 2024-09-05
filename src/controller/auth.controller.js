import { generateToken } from "../utils/jwtFunctions.js";
import { userModel } from "../Mongo/Models/user.model.js";

export class AuthController {

  static async login(req, res)
  {
    const payload = {
      email: req.user.email,
      role: req.user.role,
    };
    
    const token = generateToken(payload);

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true, 
    });

    res.redirect('/home')
  }


  static async loginError(req, res) {
    res.status(401).json({ message: "Usuario o contraseña incorrecto" });
    
  }


  static async register(req, res) {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    try {
      const userExists = await userModel.findOne({ email });

      if (userExists) {
        return res.status(400).json({
          error: "El usuario ya existe",
        });
      }

      const user = new userModel({
        first_name,
        last_name,
        email,
        age,
        password,
        role,
      });

      await user.save();

      res.redirect('/home') 
      console.log("Usuario creado ",user)
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error",
        details: error.message,
      });
    }
  }


  static async profile(req, res) {
    console.log(req.user);
    console.log("estamos en profile 2");

    const user = await userModel.findOne({email: req.user.email})
    if(user.email) console.log("SI")
    console.log(user)

    res.render('profile',{user})
  }


  static async logout(req, res) {
    res.clearCookie("token")
    res.redirect('/');

    // res.json({ message: "Sesión cerrada" }); -> si se usa POSTMAN
  }
}


