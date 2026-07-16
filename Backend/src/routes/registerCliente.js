import express from "express"
import RegisterClienteController from "../Controllers/RegisterClientes.js"

const router = express.Router()

router.route("/")
.post(RegisterClienteController.RegisterClientes)

router.route("/verifyCodeEmail")
.post(RegisterClienteController.verify)

export default router