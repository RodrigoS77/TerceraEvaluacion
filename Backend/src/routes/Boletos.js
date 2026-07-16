import express from "express"
import BoletosController from "../Controllers/BoletosController.js"

const router = express.Router()

router.route("/")
.get(BoletosController.getAllBoletos)

router.route("/id")
.delete(BoletosController.deleteBoleto)
.put(BoletosController.updateBoleto)

export default router