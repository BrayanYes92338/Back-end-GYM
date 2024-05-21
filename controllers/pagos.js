import Pago from "../models/pagos.js";
import Planes from "../models/planes.js";

const httpPagos = {
  getPagos: async (req, res) => {
    const { busqueda } = req.query;
    const pagos = await Pago.find({
      $or: [{ valor: new RegExp(busqueda, "i") }],
    });
    res.json({ pagos });
  },
  getPagosID: async (req, res) => {
    const { id } = req.params;
    const pagos = await Pago.findById(id)
    .populate("idCliente")
    res.json({ pagos });
  },
  getPagoActivo: async (req,res) => {
    const pagos = await Pago.find({estado: 1})
    res.json({ pagos })
  },
  getPagoInactivo: async (req,res) => {
    const pagos = await Pago.find({estado: 0})
    res.json({ pagos })
  },
  getPagosCliente: async (req, res) => {
    const { idCliente } = req.params;
    // const pagos = await Pago.find({idCliente},['plan','valor'],{sort:{fecha: -1}});
    const pagos = await Pago.find({idCliente},null,{sort:{fecha: -1}});
    res.json({ pagos })
  },
  postPagos: async (req, res) => {
    try {

      const { idCliente,idPlan } = req.body;

      const plan = await Planes.findById(idPlan)
      const pago = new Pago({idCliente, plan: plan.descripcion, valor: plan.valor});
      await pago.save();
      
      // const { idCliente, valor } = req.body;
      // const pagos = new Pago({ idCliente, valor });
      // await pagos.save();

      // const data = await Pago.findById(pagos._id)
      // .populate({
      //   path:"idCliente",
      //   populate:{
      //     path:"idPlan"
      //   }
      // })
     
      // const val = data.idCliente.idPlan.valor
      
      // await Pago.findByIdAndUpdate(pagos._id,{
      //   valor:val,
      //   plan: data.idCliente.idPlan.descripcion
      // })

      // res.json({ pagos });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el Pago" });
    }
  },
  putPagos: async (req, res) => {
    const { id } = req.params;
    const { idCliente, ...resto} = req.body;
    const pagos = await Pago.findByIdAndUpdate(id, resto, {new: true});
    res.json({ pagos })
  },
  putActivarPagos: async (req,res) =>{
    const { id } = req.params;
    const pagos = await Pago.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ pagos });
  },
  putDesactivarPagos: async (req,res) =>{
    const { id } = req.params;
    const pagos = await Pago.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ pagos });
  },
};

export default httpPagos 