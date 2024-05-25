import Ingreso from "../models/ingresos.js";

const helpersIngresos = {

  validarExistaIngresoId: async (id) => {
    const existe = await Ingreso.findById(id);
    if (existe == undefined) {
      throw new Error("Id no existe");
    }
  },
}

export default helpersIngresos;
