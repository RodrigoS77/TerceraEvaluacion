import express from "express"
import WompiController from "../Controllers/WompiController.js"

const router= express.Router()

router.route("/token")
.post(WompiController.generarToken)

router.route("/paymentTest")
.post(WompiController.paymentTest)

export default router