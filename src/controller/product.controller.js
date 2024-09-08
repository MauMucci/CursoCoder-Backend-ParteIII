import { ProductModel } from "../Mongo/Models/product.model.js";
import { ProductService } from "../services/product.service.js";

export class ProductController {

    static async getAllProductsAsync(req,res) {
        try {
            const products = await ProductService.getAllProductsAsync()
            res.json(products)
            
        } catch (error) {
            res.status(500).json({error: "Error al obtener los productos",details: error.message})
            
        }


    }

    static async getProductByIdAsync(req,res) {
        try {
            const {pid} = req.params
            const product = await ProductService.getProductsByIdAsync(pid)
            res.json(product)

        } catch (error) {
            res.status(500).json({error: "Error al obtener el producto",details: error.message})
            
        }
    }

    static async addProductAsync (req,res){
        try {
            
            const { title, description,thumbnail ,code, stock, price,category } = req.body;            
            const product = await ProductService.addProductAsync({title,description,thumbnail,code,stock,price,category})

            res.status(201).json(product);

        } catch (error) {

            res.status(500).json({ error: "Error al crear el producto", details: error.message });
        }
    }

    static async updateProductAsync(req,res){
        try {

            const {pid} = req.params
            const productToReplace = req.body

            await ProductService.updateProductAsync(pid,productToReplace)
            

        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el producto", details: error.message });
            
        }
    }

    static async deleteProductAsync (pid){

        pid = req.params
        return await ProductService.deleteProductAsync(pid)
    }



}