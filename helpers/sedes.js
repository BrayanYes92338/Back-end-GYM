import Sede from "../models/sedes.js"

const helperSede ={

    validarExistaSedeId:async (id)=>{
        const existe = await Sede.findById(id)
        if(existe==undefined){
            throw new Error ('La id de la sede no Existe')
        }
    }
}

export default helperSede