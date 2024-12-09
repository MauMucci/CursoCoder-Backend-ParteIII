import { expect } from "chai";
import supertest from "supertest";
import { envConfig } from "../../config/env.config.js";


const requester = supertest(`http:localhost:${envConfig.PORT}/api`)

describe(
    "Testeando las funcionalidades de User",
    () => {
        const data = { 
            first_name:"mauro",
            last_name:"mucci",
            age: 33,  
            email: "mm7@mail.com",
            password: 'pass123'
        }
        let tid = null

        it(
            "Deberia crearse un usuario",
            async () => {
                const response = await requester.post("/users").send(data)
                const{_body,statusCode} = response
                console.log(_body)

                tid = _body.response._id

                expect(statusCode).to.be.equal(201)
            }
        )
        it(
            "Deberian leerse correctamente todos los usuarios",
            async () => {
                const response = await requester.get("/users")
                const { _body, statusCode } = response
                console.log({_body, statusCode})
                expect(statusCode).to.be.equals(200)
            }
        )
        it(
            "Deberian leerse correctamente un arreglo de datos",
            async () => {
                const response = await requester.get("/users")
                const { _body } = response
                console.log({_body})
                expect(_body,response).to.be.an('array')
            }
        )
        it(
            "Deberian leerse un objeto con los datos de un usuario",
            async () => {
                const response = await requester.get("/users/"+tid)
                const { _body } = response
                console.log({_body})
                expect(_body.response).to.be.an('object')
            }
        )
        it(
            "Deberian actualizarse correctamente un usuario",
            async () => {}
        )
        it("Deberia eliminarse correctamente un usuario",
            async () => {
                const response = await requester.delete("/users"+tid)
                const {statusCode} = response
                expect(statusCode).to.be.equals(200)
            }
        )



    }
)