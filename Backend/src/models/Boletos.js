import mongoose, {Schema, model} from "mongoose"

const BoletosSchema = new Schema({
    customerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Clientes"
    },
    quantity:{
        type: String
    },
    purchaseDate: {
        type: String
    },
    total:{
        type: Boolean
    },
    paymentStatus:{
        type: Number
    },
    transactionId:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Boletos", BoletosSchema)