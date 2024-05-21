import mongoose from 'mongoose'

const MantenimientoSchema = new mongoose.Schema({
    idMaquina: { type: mongoose.Schema.Types.ObjectId, ref: 'Maquina', required: true },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String, require: true },
    responsable: { type: String, require: true },
    precio: { type: Number, require: true },
    estado: { type: Number, default: 1 }
})


export default mongoose.model("Mantenimiento", MantenimientoSchema)