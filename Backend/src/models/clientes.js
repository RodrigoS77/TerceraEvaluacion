import {Schema, model} from "mongoose"

const ClientesSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    isVerified:{
        type: Boolean
    },
    loginAttemps:{
        type: Number
    },
    timeOut:{
        type: Date
    },
    VerificationCode:{
    type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Clientes", ClientesSchema)