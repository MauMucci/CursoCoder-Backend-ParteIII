import express from 'express';
import path from 'path';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import indexRouter from './routes/index.js'
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import { config } from './config/config.js';
import cookieParser from 'cookie-parser';

const app = express()   
const PORT = 5000;

const httpServer = app.listen(PORT, ()=>console.log(`Servidor escuchando desde puerto  ${PORT}`))

const io = new Server(httpServer)


//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use(cookieParser());

//Configuracion de passport
initializePassport()
app.use(passport.initialize())

//Routes
app.use("/api", indexRouter);

app.use("*", (req, res) => {
    res.status(404).json({
      message: "Página no encontrada",
      error: "Not found",
    });
  });

//Handlebars
app.engine('handlebars', handlebars.engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','handlebars')
app.use(express.static(path.join(__dirname, 'public')));


//Websocket
io.on('connection',(socket) => {

    //console.log(`Nuevo cliente conectado con el id ${socket.id}`);

    //Evento para agregar productos
    socket.on("addProduct", async product => {  
        await pm.addProductsAsync(product);
        const products = await pm.getProductsAsync(); 
        io.emit('updateProducts', products);
    });

    //Evento para borrar productos
    socket.on('deleteProduct',async productId => {
        await pm.deleteProduct(productId)
        const products = await pm.getProductsAsync()
        io.emit('updateProducts',products)
    })
})

//Mongoose
mongoose.connect(config.MONGO_URI)
.then(console.log("CONECTADO A LA BASE DE DATOS"))
.catch(error => {
    console.log("ERROR AL CONECTARSE A LA BASE DE DATOS")
    console.log(error)
})

    
