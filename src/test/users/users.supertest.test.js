import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";
import { generateToken } from "../../utils/jwtFunctions.js";
import jwt from "jsonwebtoken"


const requester = supertest(`http://localhost:${envConfig.PORT}/api`);

let adminToken = null;
const {JWT_SECRET} = envConfig

describe("Test de User Controller", () => {
  
  before(async () => {

    const payload = {
      email: "admin2@example.com", 
      role: "admin",
    };

    
    //Genero el token
    adminToken = jwt.sign(payload, JWT_SECRET,{expiresIn: "30m"})
    
    console.log(adminToken)
    
    const adminLogin = {
      email: "admin2@example.com",
      password: "pass123"
    }
    
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
      console.log("Respuesta del servidor:", res.status, res.body); // Verificar respuesta y cuerpo

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });

    // it("Debería devolver un error si el token es inválido", async () => {
    //   const res = await requester
    //     .get("/users")
    //     .set("Authorization", "Bearer invalidToken");

    //   console.log("Respuesta del servidor - Status:", res.status);
    //   console.log("Respuesta del servidor - Body:", res.body);

    //   expect(res.status).to.equal(401);
    //   expect(res.body).to.have.property("message", "No auth token");
    // });

    it("Debería coincidir el token generado con el token recibido", () => {
      const payload = { email: "admin2@example.com", role: "admin" };
      const tokenFromServer = generateToken(payload); // Token generado por el servidor
      const tokenFromTest = adminToken; // Token generado en las pruebas
  
      console.log("Token del servidor:", tokenFromServer);
      console.log("Token de pruebas:", tokenFromTest);
  
      expect(tokenFromServer).to.equal(tokenFromTest);
    });
  });
});
