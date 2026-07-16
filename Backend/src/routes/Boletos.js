import express from "express"
import BoletosController from "../Controllers/BoletosController.js"
import {validateAuthCookie} from "../middlewares/authMiddlewares.js"


const router = express.Router()

router.route("/")
.get(validateAuthCookie(["Admin"]), BoletosController.getAllBoletos)
.post(BoletosController.InsertBoletos)

router.route("/id")
.delete(validateAuthCookie(["Admin"]), BoletosController.deleteBoleto)
.put(validateAuthCookie(["Admin", "Cliente"]), BoletosController.updateBoleto)

export default router