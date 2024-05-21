import mongoose from 'mongoose'


const ventaSchema = new mongoose.Schema({
    idProducto: {type:mongoose.Schema.Types.ObjectId,ref:'Producto',required:true},
    fechaVenta: { type: Date, default: Date.now },
    codigo: { type: String, default: 'V001'},
    valorUnitario: { type: Number, require: true },
    cantidad: { type: Number, require: true },
    total: { type: Number, default: 0 },
    estado: {type:Number, default:1}
})

export default mongoose.model('Venta', ventaSchema)