import Usuario from "../models/usuarios.js";

const helpersUsuario = {
 
  validarCorreoUnico: async (correo) => {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      throw new Error("Este correo ya existe");
    }
  },
  validarExistaUsuarioId: async (id) => {
    const existe = await Usuario.findById(id);
    if (existe == undefined) {
      throw new Error("Id no existe");
    }
  },
  noExisteCorreo: async(correo)=>{
    if(correo){
      const existe = await Usuario.findOne({correo})
      if(!existe) throw new Error('El correo no existe dentro de la base de Datos')
    }
  }
};

export default helpersUsuario;
