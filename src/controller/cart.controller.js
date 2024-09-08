import { Router } from "express";
import CartModel from "../Mongo/Models/cart.model.js";
import { CartService } from "../services/cart.service.js";

export class CartController {


    static async getAllCartsAsync(){
        try {
            const carts = await CartService.getAllCartsAsync()
            
            if(!cart){
                return res.status(404).json({
                    error: "No se encontro el carrito"
                })
            }

            res.json(carts)

        } catch (error) {

            console.error('Error al crear el carrito:', error);
            res.status(500).json({status: 'error',message: 'No se pudo crear el carrito',error: error.message})
            
        }
    }

    static async getCartByIdAsync(req,res){
        try {
            const {cid} = req.params
            const cart = await CartService.getCartByIdAsync(cid)

            if(!cart){
                return res.status(404).json({
                    error: "No se encontro el carrito"
                })
            }

            res.json(cart)
            
        } catch (error) {
            res.status(500).json({error:"Error al obtener el carrito",details: error.message})
            
        }

    }

    static async addCartAsync(req, res) {
        try {
            const { products } = req.body;

            if (!products) {
                return res.status(400).json({ error: "Faltan los productos en la solicitud" });
            }

            const newCart = await CartService.addCartAsync(products);

            res.status(201).json({
                status: 'success',
                message: 'Carrito creado exitosamente',
                data: newCart,
            });
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            res.status(500).json({
                status: 'error',
                message: 'No se pudo crear el carrito',
                error: error.message,
            });
        }
    }

    static async addProductToCartAsync(req,res){
        try {
            const { cid, pid } = req.params;

            if (!cid || !pid) {
                return res.status(400).json({ error: "Parámetros inválidos en la solicitud" });
            }

            const cart = await CartService.addProductToCartAsync(cid, pid);

            if (!cart) {
                return res.status(404).json({ error: `Producto o carrito no encontrado` });
            }

            res.status(200).json({ message: "Producto agregado al carrito correctamente" });
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            res.status(500).json({ error: "Error al agregar el producto al carrito" });
        }
    }

    static async deleteProductFromCartAsync (req,res) {

        try {
            const { cid, pid } = req.params;

            if (!cid || !pid) {
                return res.status(400).json({ error: "Parámetros inválidos en la solicitud" });
            }
            
            const cart = CartService.getCartByIdAsync(cid)


            const isProductInCart = cart.products.filter((p) => p.pid != pid)

            if (isProductInCart) {
                cart.products = cart.products.filter((p) => p.product !== productId);
                cart.save();
        
                res.json(cart);
              } else {
                return res.status(404).json({
                  error: "Producto no encontrado",
                });
              }


        } catch (error) {

            res.status(500).json({
            error: "Error al eliminar el producto del carrito",
            details: error.message,
            
        })
    }

    }

    static async deleteAllProductsFromCartAsync(req,res){
        try {
            const {cid} = req.params
            const cart = await CartService.getCartByIdAsync(cid)

            cart.products = []
            cart.save()

            res.json(cart)
        } catch (error) {
            res.status(500).json({
                error: "Error al eliminar todos los productos del carrito",
                details: error.message,
        })
    }
    }

    static async updateCartProductAsync(req,res) {

        try {
            const {cid} = req.params
            const {products} = req.body

            if(!cid || !products) return res.status(400).json({error: "Parametros invalidos"})
            
            await CartService.updateCartProductAsync(cid,products)

            res.status(200).json({message: "Productos del carrito actualizados correctamente"})

        } catch (error) {
            console.error("Error al actualizar los productos del carrito:", error);
            res.status(500).json({ error: "Error al actualizar los productos del carrito", details: error.message });
        
        }
    }

    static async purchaseAsync(req, res) {
        try {
            console.log("User object:", req.user);

            const { cid } = req.params; 
            const userEmail = req.user.email
            console.log(userEmail)
    
            if (!userEmail) {
                return res.status(400).json({ error: 'UID no encontrado, usuario no autenticado.' });
            }

            console.log("estamos en purchase controller")

            // Llamada al servicio para procesar la compra
            const result = await CartService.purchaseAsync(cid, userEmail);
        
            if (!result.success) {
                return res.status(400).json({
                error: result.message,
                details: result.details,
                });
            }
        
            res.status(200).json({
                message: "Compra finalizada",
                ticket: result.ticket,
            });
            } catch (error) {
            res.status(500).json({
                error: "Error al finalizar la compra",
                details: error.message,
            });
            }
    }
}
