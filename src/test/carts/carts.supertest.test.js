import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";
import { dbConnect } from "../../utils/dbConnect.utils.js";
import jwt from "jsonwebtoken";

const requester = supertest(`http://localhost:${envConfig.PORT}/api`);
let adminToken = null;
const { JWT_SECRET } = envConfig;

describe("TEST DE CARTS", () => {
  let cartId;

  before(async () => {
    await dbConnect(envConfig.MONGO_URI);

    //Uso un usuario admin de la base de datos para generar el token
    const payload = {
      email: "admin2@example.com",
      role: "admin",
    };

    adminToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });

    console.log("Admin login", adminToken);

    const adminLogin = {
      email: "admin2@example.com",
      password: "pass123",
    };

    const res = await requester.post("/auth/login").send(adminLogin);

    //console.log("primer res.body", res.body)

    const newCart = {
      products: [{ product: "66d5d8c67505519ce31ec566", quantity: 1 }],
    };

    const cartResponse = await requester
      .post("/carts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newCart);
    cartId = cartResponse.body.data._id;

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
    expect(cartResponse.body.data).to.have.property("_id");
    expect(cartResponse.body.data.products)
      .to.be.an("array")
      .that.has.lengthOf(1);
  });

  it("Debe obtener todos los carritos", async () => {
    const res = await requester
      .get("/carts")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debe obtener un carrito por su ID", async () => {
    const res = await requester
      .get(`/carts/${cartId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("_id").eql(cartId);
  });

  it("Debe agregar un producto a un carrito", async () => {
    const existingCartID = "6761c83b29b674ec49a006d0"; //Carrito existente en la bdd
    const productId = "66d0f27b715b4449924bbe85"; // Producto existente en la bdd
    const res = await requester
      .post(`/carts/${existingCartID}/products/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
  });

  it("Debe eliminar un producto de un carrito", async () => {
    const existingCartID = "6761c83b29b674ec49a006d0";
    const productId = "66d0f27b715b4449924bbe85"; // Producto agregado anteriormente
  
    const res = await requester
      .delete(`/carts/${existingCartID}/products/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`);
  
    expect(res.status).to.equal(200);
  
    // Verificar que el array de productos no incluya el producto eliminado
    const updatedCart = res.body;
    expect(updatedCart.products).to.be.an("array");
    const productExists = updatedCart.products.some(
      (p) => p.product._id === productId
    );
    expect(productExists).to.be.false;
  });

  it("Debe actualizar múltiples productos en el carrito", async () => {
    const existingCartID = "6761c83b29b674ec49a006d0";

    const updatedProducts = [
      {
        product: "66d0f27b715b4449924bbe84", // Producto existente 1
        quantity: 2, // Nueva cantidad para producto 1
      },
      {
        product: "66d5d8c67505519ce31ec566", // Producto existente 2
        quantity: 5, // Nueva cantidad para producto 2
      },
    ];
  
    // Realizar la solicitud para actualizar los productos en el carrito
    const res = await requester
      .put(`/carts/${existingCartID}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ products: updatedProducts });
  
      console.log("RES.BODY", res.body)

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Productos del carrito actualizados correctamente");
      expect(res.status).not.to.equal(404);
    });  
  

    it("Debe eliminar todos los productos de un carrito", async () => {
        const existingCartID = "6761da953b742b2024491d07" //Es otro carrito al que se le modifican los productos
        // Realizar la solicitud DELETE para vaciar el carrito
        const res = await requester
          .delete(`/carts/${existingCartID}`)
          .set("Authorization", `Bearer ${adminToken}`);
      
        // Validar que la solicitud fue exitosa
        expect(res.status).to.equal(200);
      
        // Validar que el carrito está vacío
        expect(res.body).to.have.property("products").that.is.an("array").that.is.empty;
      
        // Opcional: Realizar una solicitud GET al carrito para confirmar que está vacío
        const getRes = await requester
          .get(`/carts/${existingCartID}`)
          .set("Authorization", `Bearer ${adminToken}`);
      
        expect(getRes.status).to.equal(200);
        expect(getRes.body).to.have.property("products").that.is.an("array").that.is.empty;
      });
      

});
