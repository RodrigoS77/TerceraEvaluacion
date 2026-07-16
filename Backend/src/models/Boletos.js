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
        type: Date
    },
    total:{
        type: Number
    },
    paymentStatus:{
        type: Boolean
    },
    transactionId:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Boletos", BoletosSchema)