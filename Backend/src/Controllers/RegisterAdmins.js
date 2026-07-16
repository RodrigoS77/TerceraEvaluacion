import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import AdminModel from "../models/admins.js"
import {config} from "../../config.js"

const RegisterAdmin = {}

RegisterAdmin.RegisterAdmins = async (req, res) => {
    const {
        name,
        email,
        password,
        isVerified,
        loginAttemps,
        timeOut
    } = req.body

    try {
        const existAdmin = await AdminModel.findOne({email})
        if(existAdmin){
            return res.status(400).json({message: "Correo ya registrado"})
        }

        const passwordHash = await bcryptjs.hash(password, 10)
        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            {
                verificationCode,
                name,
                email,
                password: passwordHash,
                isVerified,
                loginAttemps,
                timeOut
            }, 
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("VerificationCode", tokenCode,{
            maxAge: 15*60*1000
        })

        const transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:config.email.user_email,
                pass:config.email.user_password
            }
        })
        
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Codigo De Verificacion",
            text: "Para verificar tu cuenta utiliza este codigo: " + verificationCode + " .Expira en 15 minutos"
        }

        transport.sendMail(mailOptions , (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({message: "Error Al Enviar El Correo"})
            }
            return res.status(200).json({message: "Cliente Registrado. Verifica El Correo Electronico"})
        })

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

RegisterAdmin.verify = async(req, res) => {
    try {
        const {verificationCodeRequest} = req.body

        const token = req.cookies.VerificationCode

        const decoded = jsonwebtoken.verify(
            token,
            config.JWT.secret
        )

        const {
            name,
            email,
            password,
            VerificationCode: storedCode,
            loginAttemps,
            timeOut
        } = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Codigo Incorrecto"})
        }

        const newUser = new AdminModel({
            name,
            email,
            password,
            isVerified: true,
            loginAttemps,
            timeOut
        })

        await newUser.save()

        res.clearCookie("VerificationToken")

        return res.status(200).json({message: "Cuenta Verificada Exitosamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default RegisterAdmin