import Producto from "../models/productos.js"

const helperProducto ={


     validarExistenciaId: async (id) =>{
        const existe = await Producto.findById(id);
        if(existe == undefined){
            throw new Error('El id del producto no existe')
        }
     }

}

export default helperProducto