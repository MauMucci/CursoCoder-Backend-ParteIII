import express from 'express';
import { productModel } from '../Mongo/Models/product.model.js';
import passport from 'passport';


const viewsRouter = express.Router()


viewsRouter.get('/home',passport.authenticate('jwt',{session:false}), async (req,res) => {
     const {page=1,limit=5} = req.query 

     try {
          const products = await productModel.paginate({},{limit,page})

          res.render('home',{products})

     } catch (error) {
          res.status(500).json({error})
          
     }
})

viewsRouter.get('/realTimeProducts',(req,res) => {
     res.render('realTimeProducts',{})
})
  

viewsRouter.get("/", (req,res) => {
     res.render("index",{title:"Inicio"})
})

viewsRouter.get("/login",(req,res) => {
     console.log("Estamos en login")
     res.render("login",{title:"Login"})
})

viewsRouter.get("/register",(req,res) => {
     console.log("Estamos en register")
     res.render("register",{title:"Register"})
})

viewsRouter.get("/profile", (req, res) => {
     console.log("Estamos en Profile 1")
     res.render("profile",{title:"Profile"})
   });


export default viewsRouter

