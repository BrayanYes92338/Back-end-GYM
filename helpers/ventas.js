import Venta from "../models/ventas.js";

const helperVentas = {

    validarExistenciaID: async (id) => {
        const existe = await Venta.findById(id);
        if (existe == undefined) {
            throw new Error('El id no Existe')

        }
    }


}

export default helperVentas