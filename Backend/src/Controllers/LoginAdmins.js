import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import AdminModel from "../models/admins.js"
import {config} from "../../config.js"

const LoginAdmins = {}

LoginAdmins.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const adminFound = await AdminModel.findOne({email})

        if (!adminFound) {
            return res.status(404).json({message: "Cliente No Encontrado"})
        }
        if (adminFound.timeOut && adminFound.timeOut > Date.now) {
            return res.status(403).json({message: "Cuenta Bloqueada"})
        }
        
        const isMatch = await bcrypt.compare(password, adminFound.password)
        
        if (!isMatch) {
            adminFound.loginAttemps = (adminFound.loginAttemps || 0 ) + 1


        if (adminFound.loginAttemps >= 40 ) {
            adminFound.timeOut = Date.now() + 15*60*1000
            adminFound.loginAttemps = 0

            await adminFound.save
            return res.status(403).json({message: "Cuenta Bloqueada"})
        }
            await adminFound.save()
            return res.status(400).json({message: "Contraseña Incorrecta"})

        }
        const token = jsonwebtoken.sign(
            {id: adminFound._id , userType: "Admin"},
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

export default LoginAdmins