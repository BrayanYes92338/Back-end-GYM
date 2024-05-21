import Mantenimiento from "../models/mantenimientos.js  ";

const helperMantenimientos ={
    validarExistenciaId: async (id)=>{
        const existe = await Mantenimiento.findById(id);
        if(existe== undefined){
            throw new Error ('El id del mantenimiento no existe')
        }

    }
}

export default helperMantenimientos;