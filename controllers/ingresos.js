import Ingreso from "../models/ingresos.js";

const httpIngresos = {
  getIngresos: async (req,res) => {
    const { busqueda } = req.query;
    const ingresos = await Ingreso.find({
      $or: [{ codigo: new RegExp(busqueda, "i") }],
    })
    .populate("idcliente")
    .populate("idsede")
    res.json({ ingresos }); 
  },
  getIngresosID: async (req, res) => {
    const { id } = req.params;
    const ingresos = await Ingreso.findById(id);
    res.json({ ingresos });
  },
  getIngresoSede: async (req,res) => {
    const { busqueda } = req.query;
    const ingresos = await Ingreso.find({
      idsede:busqueda
    })
    .populate("idcliente")

    res.json({ ingresos }); 
  },
  getIngresoActivo: async (req,res) => {
    const ingresos = await Ingreso.find({estado: 1})
    res.json({ ingresos })
  },
  getIngresoInactivo: async (req,res) => {
    const ingresos = await Ingreso.find({estado: 0})
    res.json({ ingresos })
  },
  postIngresos: async (req, res) => {
    try {
      const { idsede, idcliente} = req.body;

      const lastIngreso = await Ingreso.findOne().sort({ codigo: -1 });
      let newCodigo;
      if(lastIngreso){
        const lastCode = lastIngreso.codigo;
        const numericPart = parseInt(lastCode.substring(2)) + 1;
        if (numericPart < 10) {
          newCodigo = 'IN00' + numericPart;
        } else if (numericPart < 100) {
          newCodigo = 'IN0' + numericPart;
        } else {
          newCodigo = 'IN' + numericPart;
        }
      }else {
        newCodigo = 'IN001';
      }

      const ingresos = new Ingreso({ idsede, idcliente,  codigo:newCodigo });
      await ingresos.save();
      res.json({ ingresos });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el usuario" });
    }
  },
  putIngresos: async (req, res) => {
    const { id } = req.params;
    const {  idsede,...resto} = req.body;
    const ingresos = await Ingreso.findByIdAndUpdate(id, {idsede,...resto}, {new: true});
    res.json({ ingresos })
  },
  putIngresosActivar: async (req,res) =>{
    const { id } = req.params;
    const ingresos = await Ingreso.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ ingresos });
  },
  putIngresosDesactivar: async (req,res) =>{
    const { id } = req.params;
    const ingresos = await Ingreso.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ ingresos });
  },
}

export default httpIngresos;
