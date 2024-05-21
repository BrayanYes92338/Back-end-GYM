import mongoose from "mongoose";

const planeSchema=new mongoose.Schema({
  codigo: { type: String, default: 'PL001' },
  descripcion:{type:String, required:true},
  valor:{type:Number, required:true},
  dias:{type:String, required:true},
  estado:{type:Number, default:1},
})

export default mongoose.model("Planes",planeSchema)
