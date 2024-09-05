import { CartsDao } from "../DAO/carts.dao.js";
import { ProductsDao } from "../DAO/products.dao.js";

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

    // static async updateProductQuantityAsync (cid,pid,quantity){
    //     return await CartsDao.updateCartProductAsync(cid,pid,quantity)
    // }

    static async deleteAllProductsFromCartAsync (cid) {
        return await CartsDao.deleteAllProductsFromCartAsync(cid)
    }

    static async purchaseCartAsync(cid,uid){

        try {
            const {cid} = req.params

            const cart = await CartsDao.getCartByIdAsync(cid)

            if(!cart){
                throw new Error("Carrito no encontrado")
            }

            const productsWithoutStock = cart.products.filter(p => p.products.stock < p.quantity)

            if (productsWithoutStock.length > 0) {
                return {
                    success: false,
                    error: "No hay productos suficientes",
                    details: productsWithoutStock
                };
            }

            const updateStockPromises = cart.products.map(async(p) => {
                await ProductsDao.discountStockAsync(p.product._id,p.quantity)
            })

            await Promise.all(updateStockPromises)

            const amount = cart.products.reduce(
                (acc,curr) => acc + curr.quantity*curr.product.price,0
            )

            const ticket = await TicketDao.createTicketAsync ({
                code: uuid(),
                purchase_dateTime: new Date(),
                amount, 
                purchaser: uid
            })

            return {
                success: true,
                ticket,
            }


        } catch (error) {
            
        }
     

    }

}