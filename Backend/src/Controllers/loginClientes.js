import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import ClienteModal from "../models/clientes.js"
import {config} from "../../config.js"

const loginCliente = {}

loginCliente.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const ClienteFound = await ClienteModal.findOne({email})

        if (!ClienteFound) {
            return res.status(404).json({message: "Cliente No Encontrado"})
        }
        if (ClienteFound.timeOut && ClienteFound.timeOut > Date.now) {
            return res.status(403).json({message: "Cuenta Bloqueada"})
        }
        
        const isMatch = await bcrypt.compare(password, ClienteFound.password)
        
        if (!isMatch) {
            ClienteFound.loginAttemps = (ClienteFound.loginAttemps || 0 ) + 1


        if (ClienteFound.loginAttemps >= 40 ) {
            ClienteFound.timeOut = Date.now() + 15*60*1000
            ClienteFound.loginAttemps = 0

            await ClienteFound.save
            return res.status(403).json({message: "Cuenta Bloqueada"})
        }
            await ClienteFound.save()
            return res.status(400).json({message: "Contraseña Incorrecta"})

        }
        const token = jsonwebtoken.sign(
            {id: ClienteFound._id , userType: "Cliente"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

                res.cookie("AuthCookie", token)

        return res.status(200).json({message: "Login Exitoso"})
        

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default loginCliente