import express from 'express';
import { CartController } from '../controller/cart.controller.js';
import { cartDto } from '../DTO/cart.dto.js';
import { validateDTO } from '../middlewares/validateDTO.midleware.js';

const cartsRouter = express.Router();

cartsRouter.get("/",CartController.getAllCartsAsync)
cartsRouter.get('/:cid',CartController.getCartByIdAsync)


cartsRouter.post('/',validateDTO(cartDto),CartController.addCartAsync)
cartsRouter.post('/:cid/products/:pid',validateDTO(cartDto),CartController.addProductToCartAsync)
cartsRouter.post('/:cid/purchase',validateDTO(cartDto),CartController.purchaseAsync)

        
cartsRouter.delete('/:cid/products/:pid',CartController.deleteProductFromCartAsync)
cartsRouter.delete('/:cid',CartController.deleteAllProductsFromCartAsync)


cartsRouter.put('/:cid',CartController.updateCartProductAsync)


export {cartsRouter}
