import { ProductsDao } from "../DAO/products.dao.js";

export class ProductService {
    static async getAllProductsAsync() {
        return await ProductsDao.getAllProductsAsync()
    }

    static async getProductByIdAsync(id) {
        return await ProductsDao.getProductByIdAsync(id)
    }

    static async addProductAsync({title,description,thumbnail,code,stock,price,status,category}) {
        return await ProductsDao.addProductAsync({title,description,thumbnail,code,stock,price,status,category})
    }

    //- + - + 
    static async addMockProductAsync(mockProduct){
        return await ProductsDao.addMockProductAsync(mockProduct)
    }

    static async addManyMocksProductsAsync(mockProducts){
        return await ProductsDao.addManyMocksProductsAsync(mockProducts)
    }

    //- + - + 


    static async updateProductAsync(pid,productToReplace){
        return await ProductsDao.updateProductAsync(pid,productToReplace)
    }

    static async deleteProductAsync (pid) {
        return await ProductsDao.deleteProductAsync(pid)
    }

    static async discountStockAsync(pid,quantity)
    {
        return await ProductsDao.discountStockAsync(pid,quantity)
    }
}