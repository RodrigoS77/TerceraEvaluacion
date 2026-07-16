import express from "express"
import AdminsController from "../Controllers/AdminsController.js"

const router = express.Router()

router.route("/")
.get(AdminsController.getAllAdmins)

router.route("/id")
.delete(AdminsController.deleteAdmin)
.put(AdminsController.updateAdmin)

export default router