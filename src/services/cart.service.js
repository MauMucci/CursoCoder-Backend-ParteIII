import { CartsDao } from "../DAO/carts.dao.js";
import { ProductsDao } from "../DAO/products.dao.js";
import { TicketsDao } from "../DAO/ticket.dao.js";
import { v4 as uuid } from "uuid";

export class CartService {

    static async getAllCartAsync() {
        return await CartsDao.getAllCartsAsync()
    }

    static async getCartByIdAsync (cid) {
        return await CartsDao.getCartByIdAsync(cid)
    }

    static async addCartAsync (products) {
        return await CartsDao.addCartAsync(products)
    }

    static async addProductToCartAsync (cid,pid) {
        return await CartsDao.addProductToCartAsync(cid,pid)
    }

    static async deleteProductFromCartAsync (cid,pid) {
        return await CartsDao.deleteProductFromCartAsync(cid,pid)
    }

    static async updateCartProductAsync (cid,products) {
        return await CartsDao.updateCartProductsAsync(cid,products)
    }


    static async deleteAllProductsFromCartAsync (cid) {
        return await CartsDao.deleteAllProductsFromCartAsync(cid)
    }

    static async purchaseAsync(cid, email) {
        try {
          const cart = await CartsDao.getCartByIdAsync(cid);
    
          console.log("estamos en purchase service")
          console.log(email)

          if (!cart) {
            throw new Error("No se encontró el carrito");
          }
    
          const productsWithoutStock = [];

          cart.products.forEach((p) => {

            if(p.product?.stock < p.quantity){
              console.log("adentro")
              productsWithoutStock.push({
                pid: p.product._id,
                productName: p.product.title,
                description:p.product.description,
                quantity:p.quantity,
                stock: p.product.stock,
              })
              console.log("adentro2")
              console.log(productsWithoutStock)


            }
          })
         
    
          if (productsWithoutStock.length > 0) {
            return {
              success: false,
              message: "No hay productos suficientes",
              details: productsWithoutStock,
            };
          }
    
          // Descontar el stock de los productos
          const discountPromises = cart.products.map((p) => {
            return ProductsDao.discountStockAsync(p.product._id, p.quantity);
          });
    
          await Promise.all(discountPromises);
    
          // Calcular el monto total de la compra
          const amount = cart.products.reduce(
            (acc, curr) => acc + curr.quantity * curr.product.price,
            0
          );
    
          const ticket = await TicketsDao.createTicketAsync({

            code: uuid(),
            purchase_datetime: new Date(),
            amount,
            purchaser: email
          });
    
          return { message: "Compra finalizada",success: true, ticket };


        } catch (error) {
          console.error("Error en la compra:", error);
          throw new Error("Error al finalizar la compra");
        }      

    }

}