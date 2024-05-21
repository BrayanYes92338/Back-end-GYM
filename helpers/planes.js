import Planes from "../models/planes.js";

const helpersPlan = {

  validarExistaUsuarioId: async (id) => {
    const existe = await Planes.findById(id);
    if (existe == undefined) {
      throw new Error("Id no existe");
    }
  },
}

export default helpersPlan; 