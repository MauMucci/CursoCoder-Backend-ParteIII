import express from 'express';
import { ProductController } from '../controller/product.controller.js';
import { authenticate } from '../middlewares/authorization.midlewares.js';
import { authorizations } from '../middlewares/authorization.midlewares.js';
import { productDto } from '../DTO/products.js';
import { validateDTO } from '../middlewares/validateDTO.midleware.js'; 

const productsRouter = express.Router()


productsRouter.get('/',ProductController.getAllProductsAsync)
productsRouter.get('/:pid',ProductController.getProductByIdAsync)

productsRouter.post('/',ProductController.addProductAsync)

productsRouter.put('/:pid',validateDTO(productDto),authenticate("jwt"),authorizations(["admin"]),ProductController.updateProductAsync)

productsRouter.delete('/:pid',authenticate("jwt"),authorizations(["admin"]),ProductController.deleteProductAsync)

productsRouter.post('/:pid/:quantity',authenticate("jwt"),authorizations(["admin"]),ProductController.discountStockAsync)
export { productsRouter };