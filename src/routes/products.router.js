import express from 'express';
import { ProductController } from '../controller/product.controller.js';

const productsRouter = express.Router()


//------------ GET ------------
productsRouter.get('/',ProductController.getAllProductsAsync)
productsRouter.get(':pid',ProductController.getProductByIdAsync)

//------------ POST ------------
productsRouter.post('/',ProductController.addProductAsync)

//------------ PUT ------------
productsRouter.put('/:pid',ProductController.updateProductAsync)

//------------ DELETE ------------
productsRouter.delete('/:pid',ProductController.deleteProductAsync)

export { productsRouter };