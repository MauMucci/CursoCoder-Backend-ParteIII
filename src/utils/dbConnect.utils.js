import { connect } from "mongoose"
import { envConfig } from "../config/env.config.js"

const dbConnect = async () => {
    try {
        await connect(envConfig.MONGO_URI)
        console.log("CONECTADO A LA BASE DE DATOS: " + envConfig.MONGO_URI)

    } catch (error) {
        console.log(error)
        
    }
}

export {dbConnect}