import express from "express"
import logOutController from "../Controllers/LogOutAdmin.js"

const router = express.Router()

router.route("/")
.post(logOutController.LogOut)

export default router