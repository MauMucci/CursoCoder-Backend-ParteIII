import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";
import { generateToken } from "../../utils/jwtFunctions.js";
import jwt from "jsonwebtoken";

const requester = supertest(`http://localhost:${envConfig.PORT}/api`);
let adminToken = null;
const { JWT_SECRET } = envConfig;

describe("Test de User Controller", () => {
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

  // Prueba para obtener todos los usuarios
  describe("GET /users para OBTENER TODOS LOS USUARIOS", () => {
    it("Debería obtener una lista de usuarios", async () => {
      const res = await requester
        .get("/users")
        .set("Authorization", `Bearer ${adminToken}`);

      console.log("Token recibido:", adminToken); // Verificar token

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

    it("Debería coincidir el token generado con el token recibido", () => {
      const payload = { email: "admin2@example.com", role: "admin" };
      const tokenFromServer = generateToken(payload); // Token generado por el servidor
      const tokenFromTest = adminToken; // Token generado en las pruebas

      expect(tokenFromServer).to.equal(tokenFromTest);
    });

    describe("GET /users/:id para OBTENER UN USUARIO POR ID", () => {
      it("Debería devolver un usuario con un ID válido", async () => {
        //Coloco un id de un usuario existente de la base de datos.
        const userId = "675ee3b4caa6978713e7b92c";

        const res = await requester
          .get(`/users/${userId}`)
          .set("Authorization", `Bearer ${adminToken}`);

        //console.log("Respuesta del servidor - Status:", res.status);
        //console.log("Respuesta del servidor - Body:", res.body);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id", userId);
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("role");
      });
    });
  });
});

describe("PUT /users/:id para ACTUALIZAR UN USUARIO POR ID", () => {
  it("Debería actualizar un usuario con datos válidos", async () => {
    //Coloco un id de un usuario existente de la base de datos.

    const userId = "675ee3b4caa6978713e7b92c";

    const updateData = {
      first_name: "update1",
      last_name: "updat1",
      email: "updateduser@example.com",
      age: 30,
      password: "newpass123",
      role: "user",
    };

    const res = await requester
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updateData);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property("email", updateData.email);
    expect(res.body.data).to.have.property("role", updateData.role);
  });

  it("Debería devolver un error si el ID no existe", async () => {
    const invalidId = "64baddb3ec4c2b5c17c5a7f5"; // ID válido pero inexistente

    const userToUpdate = {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      age: 28,
      password: "password123",
      role: "user",
    };

    const res = await requester
      .put(`/users/${invalidId}`) // Cambiar GET por PUT
      .set("Authorization", `Bearer ${adminToken}`)
      .send(userToUpdate); // Enviar el body de la solicitud

    console.log(res.body);
    console.log(res.status);

    expect(res.status).to.equal(404); // Espera que devuelva 404
    expect(res.body).to.have.property("message", "Usuario no encontrado"); // Validar el mensaje de error
  });
});
