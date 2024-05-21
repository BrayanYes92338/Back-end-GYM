import mongoose from 'mongoose'

const maquinaSchema = new mongoose.Schema({
    idsede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
    codigo: { type: String, default: 'M001' },
    fechaIngreso: { type: Date, default: Date.now },
    fechaUltimoMantenimiento: { type: Date, default: Date.now },
    estado: { type: Number, default: 1 },
})
export default mongoose.model('Maquina', maquinaSchema)