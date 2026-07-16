import AdminsModel from "../models/admins.js"

const AdminsController = {}

AdminsController.getAllAdmins = async(req, res) => {
    try {
        const clientes = await AdminsModel.find()
        return res.status(200).json(clientes)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

AdminsController.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await AdminsModel.findByIdAndDelete(
            req.params.id
        )
        if(!deletedAdmin){
            return res.status(404).json({message: "Usuario No Encontrado"})
        }
        return res.status(200).json({message : "Usuario Eliminado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

AdminsController.updateAdmin = async (req, res) =>{
    try {
        let{
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut
        } = req.body

        const updateAdmin = await AdminsModel.findByIdAndUpdate(
            req.params.id,
            {
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut
            },
            {
                new:true
            }
        );

        if(!updateAdmin){
            return res.status(404).json({message: "Usuario No Encontrado"})
        }
        return res.status(200).json({message: "Usuario Actualizado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default AdminsController