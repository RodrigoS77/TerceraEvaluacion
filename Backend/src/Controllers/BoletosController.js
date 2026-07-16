import BoletosModel from "../models/Boletos.js"

const BoletosContoller = {}

BoletosContoller.getAllBoletos = async(req, res) => {
    try {
        const boletos = await BoletosModel
        .find()
        .populate("customerId")
        return res.status(200).json(boletos)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

BoletosContoller.deleteBoleto = async (req, res) => {
    try {
        const deletedBoletos = await BoletosModel.findByIdAndDelete(
            req.params.id
        )
        if(!deletedBoletos){
            return res.status(404).json({message: "Cliente No Encontrado"})
        }
        return res.status(200).json({message : "Cliente Eliminado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

BoletosContoller.updateBoleto = async (req, res) =>{
    try {
        let{
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        } = req.body

        const updateBoleto = await BoletosModel.findByIdAndUpdate(
            req.params.id,
            {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
            },
            {
                new:true
            }
        );

        if(!updateBoleto){
            return res.status(404).json({message: "Boleto No Encontrado"})
        }
        return res.status(200).json({message: "Boleto Actualizado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

BoletosContoller.InsertBoletos = async (req, res) => {
    try {
        const {
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        } = req.body

        const newBoleto = new BoletosModel({
            customerId,
            quantity,
            purchaseDate,
            total,
            paymentStatus,
            transactionId
        })

        await newBoleto.save()

        res.json({message: "Boleto Creado Correctamente"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default BoletosContoller