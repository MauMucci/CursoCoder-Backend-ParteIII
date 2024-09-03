import express from 'express';
import { CartController } from '../controller/cart.controller.js';

const cartsRouter = express.Router();

//------------ GET ------------
cartsRouter.get("/",CartController.getAllCartsAsync)

cartsRouter.get('/:cid',CartController.getCartByIdAsync)


//------------ POST ------------
//PARA CREAR UN CARRITO SIN PRODUCTOS
cartsRouter.post('/',CartController.addCartAsync)

//Para agregar productos a un carrito 
cartsRouter.post('/:cid/product/:pid',CartController.addProductToCartAsync())
           


//------------ DELETE ------------
//Para borrar un producto del carrito
cartsRouter.delete('/:cid/products/:pid',CartController.deleteProductFromCartAsync)

//Para borrar todos los productos del carrito
cartsRouter.delete('/:cid',CartController.deleteAllProductsFromCartAsync)


//------------ PUT ------------
//Para reemplazar un producto del carrito
cartsRouter.put('/:cid',CartController.updateCartProductsAsync)

//Para modificar la cntidad de un producto
cartsRouter.put('/:cid/products/:pid',CartController.updateProductQuantityAsync)


export {cartsRouter}
