import Cliente from "../models/clientes.js";
import Planes from "../models/planes.js";
import Pago from "../models/pagos.js"
import cron from "node-cron"


const httpClientes = {
  getClientes: async (req, res) => {
  const { busqueda } = req.query;
  const clientes = await Cliente.find({
    $or: [{ nombre: new RegExp(busqueda, "i") }],
  });
  res.json({ clientes }); 
  },
  getClientesID: async (req, res) => {
    const { id } = req.params;
    const clientes = await Cliente.findById(id);
    res.json({ clientes });
  },
  getClientesPlan: async (req, res) => {
    const { id } = req.params;
    const clientes = await Cliente.find({idPlan: id})
    .populate("idPlan")
    res.json({ clientes }); 
    },
  getClienteActivo: async (req,res) => {
    const Clientes = await Cliente.find({estado: 1})
    res.json({ Clientes })
  },
  getClienteInactivo: async (req,res) => {
    const Clientes = await Cliente.find({estado: 0})
    res.json({ Clientes })
  },
  postClientes: async (req, res) => {
    try {
      const { nombre, fechaNacimiento, edad, documento, direccion, telefono, idPlan, foto, objetivo, observaciones, seguimiento } = req.body;
      const clientes = new Cliente({ nombre, fechaNacimiento, edad, documento, direccion, telefono, idPlan, foto, objetivo, observaciones, seguimiento });
      await clientes.save();

      
      const id = clientes._id  
      
      const dias = await Planes.findById(clientes.idPlan)
      let fechaPlan = clientes.fechaVencimiento
      let fechaVencimiento = new Date(fechaPlan)
      fechaVencimiento.setDate(fechaVencimiento.getDate()+ parseInt(dias.dias))
      await Cliente.findByIdAndUpdate(id,{
        fechaVencimiento: fechaVencimiento
      })

      res.json({ clientes });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el cliente" });
    }
  },
  patchRenovarPlan: async (req,res) => {
    try { 
      const { idC, idP } = req.params;
      
      const plan = await Planes.findById(idP)
      
      let fechaHoy = new Date()
      console.log(fechaHoy);
      fechaHoy.setDate(fechaHoy.getDate()+ parseInt(plan.dias))
      await Cliente.findByIdAndUpdate(idC,{
        fechaVencimiento: fechaHoy,
        idPlan: idP
      })
  
      const pago = new Pago({idCliente: idC, plan: plan.descripcion, valor: plan.valor});
      await pago.save();
      res.json({ pago });
    } catch (error) {
      console.log(error);
    }

  },
  putClientes: async (req, res) => {
    const { id } = req.params;
    const { documento, direccion, telefono, idPlan, foto, objetivo, observaciones, seguimiento, ...resto} = req.body;
    const clientes = await Cliente.findByIdAndUpdate(id, resto, {new: true});
    res.json({ clientes })
  },
  putActivarClientes: async (req,res) =>{
    const { id } = req.params;
    const clientes = await Cliente.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ clientes });
  },
  putDesactivarClientes: async () =>{
    cron.schedule('0 0 * * *', async () =>{
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      const client = await Cliente.find()
      for (let i = 0; i < client.length; i++) {
        const cliente = client[i];
        const fechaV = new Date(cliente.fechaVencimiento)
        fechaV.setHours(0, 0, 0, 0)
        if(fechaV.getTime() === hoy.getTime()){
          await Cliente.findByIdAndUpdate(cliente._id, {estado: 0}, {new: true});
        }
      }
    })
  },
}

export default httpClientes;

