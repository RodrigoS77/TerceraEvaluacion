import express from "express"
import RegisterAdminController from "../Controllers/RegisterAdmins.js"

const router = express.Router()

router.route("/")
.post(RegisterAdminController.RegisterAdmins)

router.route("/verifyCodeEmail")
.post(RegisterAdminController.verify)

export default router