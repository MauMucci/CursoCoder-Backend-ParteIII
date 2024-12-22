import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";
import jwt from "jsonwebtoken";


const requester = supertest(`http://localhost:${envConfig.PORT}/api`);
let adminToken = null;
const { JWT_SECRET } = envConfig;



before(async () => {
      const payload = {
        email: "admin2@example.com",
        role: "admin",
      };
      
      //Genero el token
      adminToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });
      
      const adminLogin = {
        email: "admin2@example.com",
        password: "pass123",
      };
  
      const res = await requester.post("/auth/login").send(adminLogin);
  
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");

    });

    const exampleProduct = {
      title: "Test Product",
      description: "Test product",
      thumbnail: "https://example.com/test-thumbnail.jpg",
      code: "Test product",
      stock: 20,
      price: 1600,
      status: true,
      category: "Smartphones",
    };
    
    let productId = null;
    
    describe("Testeando las rutas de Products con Supertest", () => {

  it("Deberian leerse todos los products",
    async () => {

        const response = await requester.get("/products")
        const { _body, statusCode } = response
        expect(statusCode).to.be.equal(200);
  });

  it("Deberia crearse un producto", 
    async () => {
        const response = await requester.post("/products").send(exampleProduct);
        const { _body, statusCode } = response;
        console.log(_body)
        productId = _body._id;

        expect(statusCode).to.be.equal(201);
  });

  it("Debería obtener un producto por ID", async () => {
    const response = await requester.get(`/products/${productId}`);
    const { _body, statusCode } = response;
    expect(statusCode).to.be.equal(200);
    expect(_body._id).to.equal(productId);
  });

  it("Debería actualizar un producto existente", async () => {    

    const updatedId = "66d0f27b715b4449924bbe84" //Tomo un id existente

    const updatedProduct = {
      title: "Upgrated iphone",
      description: "updated",
      price: 1600,
      thumbnail: "https://example.com/iphnone-thumbnail.jpg",
      code: "Upgrated",
      stock: 20,
      status: true,
      category: "Smartphones",
    };
    
    //console.log(adminToken)

    const response = await requester
      .put(`/products/${updatedId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updatedProduct);

    expect(response.statusCode).to.be.equal(200);
    //expect(_body.price).to.equal(updatedProduct.price);
  });

  
  
  it("Debería descontar el stock correctamente", async () => {
    const quantityToDiscount = 1;
    
    const response = await requester
    .post(`/products/${productId}/${quantityToDiscount}`)
    .set("Authorization", `Bearer ${adminToken}`)
    
    expect(response.statusCode).to.be.equal(200);    
  });
  
  it("Debería eliminar un producto existente", async () => {

    console.log("Product ID", productId)
    console.log("Token", adminToken)

    const response = await requester
      .delete(`/products/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).to.be.equal(204); 
  });

});
