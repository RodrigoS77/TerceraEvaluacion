import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import ClientesRoutes from "./src/routes/clientes.js"
import AdminsRoutes from "./src/routes/admins.js"
import RegisterClientesRoutes from "./src/routes/registerCliente.js"
import RegisterAdminRoutes from "./src/routes/RegisterAdmins.js"
import Login from "./src/routes/login.js"
import LoginAdmin from "./src/routes/loginAdmin.js"
import BoletosRoutes from "./src/routes/Boletos.js"
import Wompi from "./src/routes/Wompi.js"
import LogOutClientes from "./src/routes/LogOutClientes.js"
import LogOutAdmin  from "./src/routes/LogOutAdmin.js"

const app = express()

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json())

app.use("/api/Clientes", ClientesRoutes)
app.use("/api/Admins", AdminsRoutes)
app.use("/api/RegisterCliente", RegisterClientesRoutes)
app.use("/api/RegisterAdmin", RegisterAdminRoutes)
app.use("/api/loginClientes", Login)
app.use("/api/loginAdmin", LoginAdmin)
app.use("/api/Boletos", BoletosRoutes)
app.use("/api/Wompi", Wompi)
app.use("/api/LogOutClientes", LogOutClientes)
app.use("/api/LogOutAdmin", LogOutAdmin)

export default app