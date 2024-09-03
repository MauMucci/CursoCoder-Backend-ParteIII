import { ProductsDao } from "../DAO/products.dao.js";

export class ProductService {
    static async getProductsAsync() {
        return await ProductsDao.getProductsAsync()
    }

    static async getProductsByIdAsync(id) {
        return await ProductsDao.getProductByIdAsync(id)
    }

    static async addProductAsync({title,description,thumbnail,code,stock,price,status}) {
        return await ProductsDao.addProductAsync({title,description,thumbnail,code,stock,price,status})
    }

    static async updateProductAsync(pid,productToReplace){
        return await ProductsDao.updateProductAsync(pid,productToReplace)
    }

    static async deleteProductAsync (pid) {
        return await ProductsDao.deleteProductAsync(pid)
    }
}