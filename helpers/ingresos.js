import Ingreso from "../models/ingresos.js";

const helpersIngresos = {
  validarCodigoUnico: async (codigo) => {
    const existe = await Ingreso.findOne({ codigo });
    if (existe) {
      throw new Error("Este codigo ya existe");
    }
  },
  validarExistaIngresoId: async (id) => {
    const existe = await Ingreso.findById(id);
    if (existe == undefined) {
      throw new Error("Id no existe");
    }
  },
}

export default helpersIngresos;
