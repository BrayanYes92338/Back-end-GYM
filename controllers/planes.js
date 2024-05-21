import Planes from "../models/planes.js";

const httpPlanes = {
  getPlanes: async (req, res) => {
    const { busqueda } = req.query;
    const planes = await Planes.find({
      $or: [{ codigo: new RegExp(busqueda, "i") }],
    });
    res.json({ planes }); 
  },
  getPlanesID: async (req, res) => {
    const { id } = req.params;
    const planes = await Planes.findById(id);
    res.json({ planes });
  },
  getPlanesActivo: async (req,res) => {
    const planes = await Planes.find({estado: 1})
    res.json({ planes })
  },
  getPlanesInactivo: async (req,res) => {
    const planes = await Planes.find({estado: 0})
    res.json({ planes })
  },
  postPlanes: async (req, res) => {
    try {
      const { descripcion,valor,dias } = req.body;
      const lastPlanes = await Planes.findOne().sort({ codigo: -1 });
      let newCodigo;
        if (lastPlanes) {
            const lastCode = lastPlanes.codigo;
            const numericPart = parseInt(lastCode.substring(2)) + 1;
            // Formatear el nuevo código
            if (numericPart < 10) {
                newCodigo = 'PL00' + numericPart;
            } else if (numericPart < 100) {
                newCodigo = 'PL0' + numericPart;
            } else {
                newCodigo = 'PL' + numericPart;
            }
        } else {
            newCodigo = 'PL001'; 
        }
      const planes = new Planes({ codigo:newCodigo,descripcion,valor,dias });
      await planes.save();
      res.json({ planes });
    } catch (error) {
      res.status(400).json({ err: "No se pudo crear el Plan" });
    }
  },
  putPlanes: async (req, res) => {
    const { id } = req.params;
    const { valor,...resto} = req.body;
    const planes = await Planes.findByIdAndUpdate(id, {valor,...resto}, {new: true});
    res.json({ planes })
  },
  putPlanesActivar: async (req,res) =>{ 
    const { id } = req.params;
    const planes = await Planes.findByIdAndUpdate(id, {estado: 1}, {new: true});
    res.json({ planes });
  },
  putPlanesDesactivar: async (req,res) =>{
    const { id } = req.params;
    const planes = await Planes.findByIdAndUpdate(id, {estado: 0}, {new: true});
    res.json({ planes });
  },
}

export default httpPlanes;