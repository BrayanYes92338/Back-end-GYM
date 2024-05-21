import mongoose from 'mongoose'

const ingresoSchema=new mongoose.Schema({
  idsede:{type:mongoose.Schema.Types.ObjectId,ref:'Sede',required: true, },
  idcliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required: true, },
  fecha:{type:Date, default:Date.now},
  codigo:{type:String, required:true, unique:true},
  estado:{type:Number, default:1},
})

export default mongoose.model("Ingreso", ingresoSchema)