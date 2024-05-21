import Maquina from "../models/maquinas.js";

const httpMaquinas = {
    getMaquinas: async (req, res)=>{
        const {busqueda} = req.query;
        const maquina = await  Maquina.find({
            $or:[{codigo: new RegExp(busqueda, "i")}]
        })
        .populate({
            path:"idsede"
        })
        res.json({maquina})
    },
    getMaquinaID: async (req, res) =>{
        const {id} = req.params;
        const maquinas  = await Maquina.findById(id) ;
        res.json({maquinas})
    },
    getMaquinaActivo: async (req,res) => {
        const maquinas = await Maquina.find({estado: 1})
        res.json({ maquinas })
    },
    getMaquinaInactivo: async (req,res) => {
        const maquinas = await Maquina.find({estado: 0})
        res.json({ maquinas })
    },
    postMaquinas:async (req, res) =>{
        try{
         const { idsede} = req.body;
          // Obtener el último código utilizado
        const lastSede = await Maquina.findOne().sort({ codigo: -1 });

        let newCodigo;
        if (lastSede) {
            const lastCode = lastSede.codigo;
            const numericPart = parseInt(lastCode.substring(1)) + 1;
            // Formatear el nuevo código
            if (numericPart < 10) {
                newCodigo = 'M00' + numericPart;
            } else if (numericPart < 100) {
                newCodigo = 'M0' + numericPart;
            } else {
                newCodigo = 'M' + numericPart;
            }
        } else {
            newCodigo = 'M001'; 
        }
         const maquina = new Maquina({idsede, codigo: newCodigo})
         await maquina.save();
         res.json({maquina})
        }catch(error){
            res.status(400).json({err: "No se pudo agregar la Maquina"})
        }
    },
    putMaquinas:async(req, res) =>{
        const {id} = req.params;
        const {idsede} = req.body;
        const maquina = await Maquina.findByIdAndUpdate(id, {idsede}, {new: true})
        res.json({maquina})
    },
    putMaquinasActivar: async(req, res) =>{
        const {id} = req.params;
        const maquina = await Maquina.findByIdAndUpdate(id,{estado:1}, {new:true})
        res.json({maquina})
    },
    putMaquinasDesactivar: async(req, res) =>{
        const {id} = req.params;
        const maquina = await Maquina.findByIdAndUpdate(id,{estado:0}, {new:true})
        res.json({maquina})
    },

};

export default httpMaquinas