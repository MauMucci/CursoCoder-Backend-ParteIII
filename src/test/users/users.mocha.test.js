import  assert  from "assert";
import { envConfig } from "../../config/env.config.js";
import { UserService } from "../../services/user.service.js";
import { dbConnect } from "../../utils/dbConnect.utils.js";


describe(
    "TESTING USER DAO",
    () => {

        before(async () => await dbConnect(envConfig.MONGO_URI))

        const data = { first_name:"mauro", last_name:"mucci",age: 33,  email: "mm2@mail.com",password: 'pass123'}
        let tid = null


        it(
            "La propiedad email es enviada por el usuario que quiere registrarse",
            () => {
                assert.ok(data.email)
            }
        )
        it(
            "La propiedad password es enviada por el usuario que quiere registrarse",
            () => {
                assert.ok(data.password)
            }
        )
        it(
            "La creacion de un usuario devuelve un objeto con el objectId",
            async () => {
                const user = await UserService.addUserAsync(data)
                //console.log(user)
                tid = user._id
                assert.ok(user._id)
            }
        )

        it(
            "El usuario no se crea si ya existe en la BDD",
            async () => {
                const user = await UserService.getUserByIdAsync(tid)
                if(!user){
                    const newUser = await UserService.addUserAsync(data)
                    tid = newUser._id
                    assert.ok(newUser._id)
                }            
                assert.ok(newUser._id)                
            }
        )
        it(
            "La eliminacion de un usuario lo borra de la BDD",
            async () => {
                await UserService.deleteUserAsync(tid)
                const userDeleted = await UserService.getUserByIdAsync(tid)
                
                assert.strictEqual(userDeleted,null)

            }
        )

    }
)