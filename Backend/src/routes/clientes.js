import express from "express"
import ClientesController from "../Controllers/ClientesController.js"

const router = express.Router()

router.route("/")
.get(ClientesController.getAllClientes)

router.route("/id")
.delete(ClientesController.deleteCliente)
.put(ClientesController.updateCliente)

export default router