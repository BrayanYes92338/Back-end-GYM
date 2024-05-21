import Cliente from "../models/clientes.js";

const helpersCliente = {
  validarDocumentoUnico: async (documento) => {
    const existe = await Cliente.findOne({ documento });
    if (existe) {
      throw new Error("Este documento ya existe en la base de datos");
    }
  },
  validarExistaClienteId: async (id) => {
    const existe = await Cliente.findById(id);
    if (existe == undefined) {
      throw new Error("Id no existe");
    }
  },
};

export default helpersCliente;