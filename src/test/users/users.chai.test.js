import {expect} from "chai"
import { envConfig } from "../../config/env.config.js"
import { UserService } from "../../services/user.service.js"
import { dbConnect } from "../../utils/dbConnect.utils.js"

describe(
    "Testeando las rutas de usuarios con CHAI",

    () => {
        const data = { first_name:"mauro", last_name:"mucci",age: 33,  email: "mm6@mail.com",password: 'pass123'}
        let tid = null

        before(async () => await dbConnect(envConfig.MONGO_URI))
        it(
            "La propiedad email es enviada por el usuario que quiere registrarse",
            () => expect (data).to.have.property("email")
        )
        it(
            "La propiedad email es de tipo string",
            () => expect (data.email).to.be.a("string")
        )
        it(
            "La propiedad email entrega un email",
            () => {
            const haveAnAt = data.email.includes('@')
            expect(haveAnAt).to.be.equal(true)
            }
        )
        it(
            "La creacion de un usuario devuelve un objeto con el objectId",
            async () => {
                const newUser = await UserService.addUserAsync(data)
                //console.log(user)
                tid = newUser._id
                expect(newUser).to.have.property("_id")
            }
        )
        it(
            "Deberia eliminar un usuario por su ID",
            async () => {
                await UserService.deleteUserAsync(tid)
                const userDeleted = await UserService.getUserByIdAsync(tid)
                
                expect(userDeleted).not.exist

            }
        )

        it(
            "La creacion de un usuario devuelve un usuario con un rol por defecto de tipo string",
            async () => {
                const newUser = await UserService.addUserAsync(data)
                expect(newUser).to.have.property("role")
                expect(newUser.role).to.be.a("string")
                expect(newUser.role).to.be.equal("user")

            }
        )
        // it(
        //     "La creacion de un rol de un usuario es de tipo string",
        //     async () => {
        //         const user = await UserService.getUserByIdAsync(data.tid)
        //         expect(user.role).to.be.a("string")

        //     }
        // )


    }
)
