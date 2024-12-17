import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}/api`);

describe("Test de Auth Controller", () => {
    
    let createdUserId = null;
    let token = '';

    describe("DEBERIA REGISTRAR, LOGEAR Y ELIMINAR UN USUARIO", () => {

        it("Debería crear un usuario nuevo correctamente", async () => {
            const newUser = {
                first_name: "Nuevo",
                last_name: "Usuario",
                email: "t2@example.com",
                age: 30,
                password: "pass123",
                role: "user",
            };
            const res = await requester.post("/auth/register").send(newUser);

            createdUserId = res.body.user._id;

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message", "Usuario registrado correctamente");
            expect(res.body).to.have.property("user");
        });
        
        it("Debería iniciar sesión correctamente", async () => {
            const userToLogin = {
                email: "t2@example.com",
                password: "pass123"
            };

            const res = await requester.post("/auth/login").send(userToLogin);

            token = res.body.token; // Almacena el token de sesión

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message", "Sesión iniciada");
        });

        it("Debería eliminar el usuario creado correctamente", async () => {
            console.log("Token de sesión:", token);
            console.log("Usuario a eliminar: ", createdUserId)

            const res = await requester.delete(`/users/${createdUserId}`)
                .set("Authorization", `Bearer ${token}`); // Se añade el token para la autorización

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message", "Usuario eliminado correctamente");
        });
    });
});
