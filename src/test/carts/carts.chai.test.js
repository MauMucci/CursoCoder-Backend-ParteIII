import { expect } from "chai";
import { envConfig } from "../../config/env.config.js";
import { CartService } from "../../services/cart.service.js";
import { dbConnect } from "../../utils/dbConnect.utils.js";
import assert from "assert";

describe("Testeando las funcionalidades de Carts con CHAI", () => {
    let cartId = "6761c83b29b674ec49a006d0"; //Carrito existente en la bdd

    before(async () => {
        await dbConnect(envConfig.MONGO_URI);
    });

    it("El carrito debería obtenerse correctamente por su ID", async () => {
        const retrievedCart = await CartService.getCartByIdAsync(cartId);

        console.log(retrievedCart)
        console.log(retrievedCart._id)

        expect(retrievedCart).to.have.property("_id").that.satisfies((id) => id.toString() === cartId, "El ID del carrito no coincide");
        expect(retrievedCart.products).to.be.an("array").that.has.length.greaterThan(0);
    });

    it("El carrito debería contener productos con cantidad mayor a 0", async () => {
        const retrievedCart = await CartService.getCartByIdAsync(cartId);
        retrievedCart.products.forEach((item) => {
            assert.ok(item.quantity > 0, "La cantidad de los productos debe ser mayor a 0");
        });
    });

    it("Los productos en el carrito deberían tener una propiedad 'product' válida", async () => {
        const retrievedCart = await CartService.getCartByIdAsync(cartId);
        retrievedCart.products.forEach((item) => {
            expect(item).to.have.property("product").that.is.an("object");
            expect(item.product._id.toString()).to.be.a("string");
        });
    });
});
