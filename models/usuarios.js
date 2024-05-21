import mongoose from 'mongoose';

const usuarioSchema=new mongoose.Schema({
  idsede:{type:mongoose.Schema.Types.ObjectId,ref:'sede',required: true, },
  nombre:{type:String, required:true},
  direccion:{type:String, required:true},
  codigo: { type: String, default: 'US001' },
  horario:{type:String, required:true},
  ciudad:{type:String, required:true},
  telefono:{type:String, required:true},
  correo:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  rol:{type:String, required:true},
  estado:{type:Number, default:1},
  createAt:{type:Date, default:Date.now}
})

export default mongoose.model("Usuario",usuarioSchema)