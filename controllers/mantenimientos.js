import Mantenimiento from "../models/mantenimientos.js"
import Maquina from "../models/maquinas.js";

const httpMantenimientos = {
    getMantenimientos: async (req, res)=>{
        const {busqueda} =req.query;
        const mantenimiento = await Mantenimiento.find({
            $or:[{responsable: new RegExp(busqueda, "i")}]
        })
        res.json({mantenimiento})
    },
    getMantenimientosID: async (req, res)=>{
        const {id} = req.params;
        const mantenimientos = await Mantenimiento.findById(id);
        res.json({mantenimientos})
    },
    getMantenimientoActivo: async (req,res) => {
        const Mantenimientos = await Mantenimiento.find({estado: 1})
        res.json({ Mantenimientos })
    },
    getMantenimientoInactivo: async (req,res) => {
        const Mantenimientos = await Mantenimiento.find({estado: 0})
        res.json({ Mantenimientos })
    },
    getMantenimientosValor: async (req,res) => {

     let acum = 0

    const { fechaInicio, fechaFin } = req.body;

    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ mensaje: 'Por favor proporciona las fechas de inicio y fin' });
    }

    try {
        const documentos = await Mantenimiento.find({
            fecha: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        });

        if(documentos.length === 0) {
            res.json({ message: "no se encontro ningun mantenimiento entre esas fechas"})
        }else{
            
        for (let i = 0; i < documentos.length; i++) {
            const element = documentos[i];
            acum = acum + element.precio
        }

        res.json(`El valor de los mantenimientos entre las fechas ${fechaInicio} y ${fechaFin} es de ${acum} pesos`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
    }

    },
    getMantenimientosMaquina: async (req,res) => {
        try {
            const { id } = req.params;
            const mantenimientos = await Mantenimiento.find({idMaquina: id})
            .populate({path:"idMaquina"})
            res.json(mantenimientos)
        } catch (error) {
            res.status(500).json({ mensaje: 'No se pudo realizar la peticion' });
        }
    },
    postMantenimientos: async (req, res) => {
        try{
            const { idMaquina, descripcion, responsable,precio}  = req.body;

            const response = await Maquina.findByIdAndUpdate(idMaquina, {fechaUltimoMantenimiento: Date.now()})

            const mantenimiento = new Mantenimiento({ idMaquina, descripcion, responsable,precio})
            await mantenimiento.save();
            res.json({mantenimiento})
            
        }catch(error){
            res.status(400).json({err: "No se pudo agregar el mantenimiento"});
        }
    },
    putMantenimientos: async (req, res) =>{
        const {id} = req.params;
        const {idMaquina,...resto} = req.body;
        const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, {idMaquina,...resto}, {new:true})
        res.json({mantenimiento})
    },
    putMantenimientosActivar: async (req, res) =>{
        const {id} = req.params;
        const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, {estado: 1}, {new: true})
        res.json({mantenimiento})
    },
    putMantenimientosDesactivar: async (req, res) =>{
        const {id } = req.params;
        const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, {estado: 0}, {new: true})
        res.json({mantenimiento})
    }
}

export default httpMantenimientos