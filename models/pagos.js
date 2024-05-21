import mongoose from 'mongoose'

const pagoSchema = new mongoose.Schema({
    idCliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required:true},
    plan:{type:String, default:""},
    fecha:{type:Date, default:Date.now},
    valor:{type:String, default:0},
    estado:{type:Number, default:1},
})

export default mongoose.model('Pago', pagoSchema) 