import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../config/env.config.js";

const requester = supertest(`http://localhost:${envConfig.PORT}/api`);

let createdUserId;

describe("Test de Auth Controller", () => {
    
    describe("Post en api/auth/register para REGISTRAR UN USUAIO", () => {

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

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message", "Usuario registrado correctamente");
            expect(res.body).to.have.property("user");

            createdUserId = res.body._id;
        });
        
        it("Debería iniciar sesión correctamente", async () => {
        const userToLogin = {
            email: "t2@example.com",
            password: "pass123"
        };

        const res = await requester.post("/auth/login").send(userToLogin);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Sesión iniciada");
    });

    // it("Debería eliminar el usuario creado correctamente", async () => {
    //     if (!createdUserId) {
    //         throw new Error("createdUserId no está definido");
    //     }

    //     const res = await requester.delete(`/auth/users/${createdUserId}`);
        
    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.have.property("message", "Usuario eliminado correctamente");
    // });
});
});
