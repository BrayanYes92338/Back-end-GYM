import Maquina from "../models/maquinas.js"

const helpersMaquinas = {

    validarExistenciaId: async (id)=>{
        const existe = await  Maquina.findById(id);
        if(existe == undefined){
            throw new Error ('El id de la maquina no Existe')
        }
    }
}

export default helpersMaquinas