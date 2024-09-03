import { CartsDao } from "../DAO/carts.dao";

export class CartService {

    static async getAllCartAsync() {
        return await CartsDao.getCartAsync()
    }

    static async getCartByIdAsync (cid) {
        return await CartsDao.getCartByIdAsync(cid)
    }

    static async addCartAsync () {
        return await CartsDao.addCartAsync()
    }

    static async addProductToCartAsync (cid,pid) {
        return await CartsDao.addProductToCartAsync(cid,pid)
    }

    static async deleteProductFromCartAsync (cid,pid) {
        return await CartsDao.deleteProductFromCartAsync(cid,pid)
    }

    static async updateCartProductAsync (cid,products) {
        return await CartsDao.updateCartProductAsync(cid,products)
    }

    static async updateProductQuantityAsync (cid,pid,quantity){
        return await CartsDao. updateCartProductAsync(cid,pid,quantity)
    }

    static async deleteAllProductsFromCartAsync (cid) {
        return await CartsDao.deleteAllProductsFromCartAsync(cid)
    }

}