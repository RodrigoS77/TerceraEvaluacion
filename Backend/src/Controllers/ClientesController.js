import ClientesModel from "../models/clientes.js"

const ClienteController = {}

ClienteController.getAllClientes = async(req, res) => {
    try {
        const clientes = await ClientesModel.find()
        return res.status(200).json(clientes)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

ClienteController.deleteCliente = async (req, res) => {
    try {
        const deletedCliente = await ClientesModel.findByIdAndDelete(
            req.params.id
        )
        if(!deletedCliente){
            return res.status(404).json({message: "Cliente No Encontrado"})
        }
        return res.status(200).json({message : "Cliente Eliminado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

ClienteController.updateCliente = async (req, res) =>{
    try {
        let{
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut
        } = req.body

        const updateCliente = await ClientesModel.findByIdAndUpdate(
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

        if(!updateCliente){
            return res.status(404).json({message: "Cliente No Encontrado"})
        }
        return res.status(200).json({message: "Cliente Actualizado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default ClienteController