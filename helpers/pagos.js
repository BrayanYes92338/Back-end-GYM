import Pago from "../models/pagos.js";

const helpersPago = {
    validarExistaPagoId: async (id) => {
        const existe = await Pago.findById(id);
        if (existe == undefined) {
          throw new Error("Id no existe");
        }
      },
}

export default helpersPago;