import CartModel from "../Mongo/Models/Cart.model.js";
import { ProductsDao } from "./products.dao.js";

export class CartsDao {

    // Obtener todos los carritos
    static async getAllCartsAsync() {
        try {
            return await CartModel.find();
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw new Error('No se pudo obtener la lista de carritos');
        }
    }

    // Obtener un carrito por ID
    static async getCartByIdAsync(cid) {
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            if (!cart) {
                throw new Error(`Carrito con ID ${cid} no encontrado`);
            }
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw new Error('No se pudo obtener el carrito');
        }
    }

    // Agregar un nuevo carrito
    static async addCartAsync(products) {
        try {
            const newCart = await CartModel.create({ products });
            console.log("Carrito creado exitosamente", newCart);
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw new Error('No se pudo crear el carrito');
        }
    }

    // Agregar un producto a un carrito
    static async addProductToCartAsync(cid, pid) {
        try {
            const cart = await CartsDao.getCartByIdAsync(cid);
            
            if(!cart){
                throw new Error('Carrito no encontrado')
            }
            
            const product = await ProductsDao.getProductByIdAsync(pid);

            if (!product) {
                throw new Error("Producto no encontrado");
            }

            const existingProduct = cart.products.find((p) => p.product._id.toString() === pid);

            if (existingProduct) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                cart.products.push({ product: pid, quantity: 1 });
            }

            await cart.save();

            return cart;        

        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw new Error('No se pudo agregar el producto al carrito');
        }
    }

    // Eliminar un producto de un carrito
    static async deleteProductFromCartAsync(cid, pid) {
        try {
            const cart = await CartsDao.getCartByIdAsync(cid);

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (productIndex === -1) {
                throw new Error(`Producto con ID ${pid} no encontrado en el carrito`);
            }

            cart.products.splice(productIndex, 1);
            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw new Error('No se pudo eliminar el producto del carrito');
        }
    }

    // Actualizar los productos de un carrito
    static async updateCartProductsAsync(cid, products) {
        try {
            const cart = await CartsDao.getCartByIdAsync(cid);
            cart.products = products;
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al actualizar los productos del carrito:', error);
            throw new Error('No se pudo actualizar los productos del carrito');
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    static async updateProductQuantityAsync(cid, pid, quantity) {
        try {
            const cart = await CartsDao.getCartByIdAsync(cid);

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (productIndex === -1) {
                throw new Error(`Producto con ID ${pid} no encontrado en el carrito`);
            }

            cart.products[productIndex].quantity = quantity;  
            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
            throw new Error('No se pudo actualizar la cantidad del producto en el carrito');
        }
    }

    // Eliminar todos los productos de un carrito
    static async deleteAllProductsFromCartAsync(cid) {
        try {
            const cart = await CartsDao.getCartByIdAsync(cid);
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error);
            throw new Error('No se pudieron eliminar los productos del carrito');
        }
    }

    
}
