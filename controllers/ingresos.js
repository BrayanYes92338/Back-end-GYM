import Ingreso from "../models/ingresos.js";

const httpIngresos = {
  getIngresos: async (req,res) => {
    const { busqueda } = req.query;
    const ingresos = await Ingreso.find({
      $or: [{ codigo: new RegExp(busqueda, "i") }],
    });
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
      const { idsede, idcliente, fecha, codigo } = req.body;
      const ingresos = new Ingreso({ idsede, idcliente, fecha, codigo });
      await ingresos.save();
      res.json({ ingresos });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el usuario" });
    }
  },
  putIngresos: async (req, res) => {
    const { id } = req.params;
    const {  idsede, idcliente, fecha, ...resto} = req.body;
    const ingresos = await Ingreso.findByIdAndUpdate(id, resto, {new: true});
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
