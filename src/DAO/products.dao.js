import { ProductModel } from "../Mongo/Models/product.model.js";

export class ProductsDao {

    static getAllProductsAsync = async () => {
        return await ProductModel.find()
    }

    static getProductByIdAsync = async (pid) => {
        return await ProductModel.findById(pid)
    }

    static addProductAsync = async ({title,description,thumbnail,code,stock,price,status}) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("DATOS INCOMPLETOS PARA AGREGAR EL PRODUCTO")            
            return null
        }

        return await ProductModel.create({title,description,thumbnail,code,stock,price,status})
    }

    static updateProductAsync = async (pid, productToReplace) => {
        if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.thumbnail || !productToReplace.code || !productToReplace.stock) {
            console.log("DATOS INCOMPLETOS PARA SOBRESCRIBIR EL PRODUCTO")
            return null
        }

        return await ProductModel.updateOne({_id: pid},productToReplace)
    }

    static deleteProductAsync = async (pid) => {
        return await ProductModel.deleteOne({_id: pid})
    }
}