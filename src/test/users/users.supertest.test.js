import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}/api`);

let adminToken = null;

describe("Test de User Controller", () => {
  // Antes de todas las pruebas, autenticar al administrador
  before(async () => {
    const adminLogin = {
      email: "admin@example.com", // Corregido el error tipográfico
      password: "pass123",
    };

    const res = await requester.post("/auth/login").send(adminLogin);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");

    adminToken = res.body.token;
  });

  // Prueba para obtener todos los usuarios
  describe("GET /users para OBTENER TODOS LOS USUARIOS", () => {
    it("Debería obtener una lista de usuarios", async () => {
      const res = await requester
        .get("/users")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
});
