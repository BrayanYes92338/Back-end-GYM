import mongoose from 'mongoose';

const clienteSchema=new mongoose.Schema({
  nombre:{type:String, required:true},
  fechaNacimiento:{type:Date, required:true},
  edad:{type:String, required:true},
  fechaIngreso:{type:Date, default:Date.now},
  documento:{type:String, required:true, unique:true},
  direccion:{type:String, required:true},
  telefono:{type:String, required:true},
  estado:{type:Number, default:1},
  idPlan:{ type: mongoose.Schema.Types.ObjectId, ref: 'Planes', required: true },
  foto:{type:String, required:true},
  objetivo:{type:String, required:true},
  observaciones:{type:String, required:true},
  fechaVencimiento:{type:Date, default:Date.now},
  seguimiento:[{
    fecha:{type:Date, default:Date.now},
    peso:{type:String, default:0},
    estatura:{type:String, default:0},
    brazo:{type:String, default:0},
    pierna:{type:String, default:0},
    cintura:{type:String, default:0},
    imc:{type:String, default:0},
  }]
})

export default mongoose.model("Cliente",clienteSchema)
