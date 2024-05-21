import mongoose from 'mongoose'

const sedeSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    dirrecion: { type: String, require: true },
    codigo: { type: String, default: 'SE001' },
    horario: { type: String, require: true },
    ciudad: { type: String, require: true },
    telefono: { type: String, require: true },
    estado:{type:Number, default:1},
})

export default mongoose.model("Sede", sedeSchema)