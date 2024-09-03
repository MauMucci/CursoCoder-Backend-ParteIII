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

    static async addCartAsync(req,res){
        try {
            
            const cart = await CartService.addCartAsync()
            res.status(201).json({status: 'success',message: 'Carrito creado exitosamente',data: cart})
            
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            res.status(500).json({status: 'error',message: 'No se pudo crear el carrito',error: error.message})
            
        }
    }

    static async addProductToCartAsync(req,res){
        try {
            const { cid, pid } = req.params;

            // Verifica que los parámetros cid y pid sean válidos
            if (!cid || !pid) {
                return res.status(400).json({ error: "Parámetros inválidos en la solicitud" });
            }

            // Llama al servicio para agregar el producto al carrito
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



    
}
