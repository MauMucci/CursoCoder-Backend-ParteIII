import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";

const requester = supertest(`http:localhost:${envConfig.PORT}/api`);

describe("Testeando las rutas de Products con Supertest", () => {
  const exampleProduct = {
    title: "Iphone",
    description: "16 pro Max",
    price: 1600,
    thumbnail: "https://example.com/iphnone-thumbnail.jpg",
    code: "IPHONE16PROMAX-ARG",
    stock: 20,
    status: true,
    category: "Smartphones",
  };

  let productId = null;

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
        productId = _body.response._id;

        expect(statusCode).to.be.equal(201);
  });
});
