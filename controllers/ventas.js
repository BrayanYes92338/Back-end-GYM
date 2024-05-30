import Venta from "../models/ventas.js"
import Producto from "../models/productos.js"

const httpVentas = {

    getVenta: async (req, res) => {
        const { busqueda } = req.query;
        const venta = await Venta.find({
            $or: [{ codigo: new RegExp(busqueda, "i") }]
        })
        .populate("idProducto")
        res.json({ venta })
    },
    getVentaID: async (req, res) => {
        const { id } = req.params;
        const ventas = await Venta.findById(id);
        res.json({ ventas })
    },
    getVentaActivo: async (req,res) => {
        const ventas = await Venta.find({estado: 1})
        .populate("idProducto")
        res.json({ ventas })
    },
    getVentaInactivo: async (req,res) => {
        const ventas = await Venta.find({estado: 0})
        .populate("idProducto")
        res.json({ ventas })
    },
    postVenta: async (req, res) =>{
        try{
            const {idProducto,fechaVenta, valorUnitario,cantidad} = req.body;
            const lastcode = await Venta.findOne().sort({codigo: -1});
            let newCodigo;
            if(lastcode){
                const lastCode = lastcode.codigo;
                const numericPart = parseInt(lastCode.substring(2)) + 1;
                if(numericPart < 10){
                    newCodigo = 'VE00' + numericPart;
                }else if(numericPart < 100){
                    newCodigo = 'VE0' + numericPart;
                }else{
                    newCodigo = 'VE' + numericPart;
                }
            }else {
                newCodigo = 'VE001';
            }
            const venta = new Venta({idProducto,fechaVenta,codigo:newCodigo, valorUnitario,cantidad})
            await venta.save();
            

           const productos = await Producto.findById(idProducto);
           const result = productos.cantidad-venta.cantidad
           if (productos.cantidad > 0) {
            const data = await Producto.findByIdAndUpdate(idProducto, {cantidad: result})
           }else {
            return res.status(200).json({ message: `El producto ${productos.nombre} ya no tiene stock` })
           }

           const totl = valorUnitario * cantidad
           const dataventa = await Venta.findByIdAndUpdate(venta._id, {
            total: totl
           })
            res.json({venta})
        }catch (error){
            res.status(400).json({
                err:"No se pudo arregar la venta"
            })
        }
    },
    putVentas: async (req, res) =>{
        const {id} = req.params;
        const {idProducto, ...resto} = req.body;
        const venta = await Venta.findByIdAndUpdate(id, {idProducto,...resto}, {new:true})
        res.json({venta})
    },
    putVentasActivar: async(req, res) =>{
        const {id} = req.params;
        const venta = await Venta.findByIdAndUpdate(id, {estado: 1}, {new: true})
        res.json({venta})
    },
    putVentasDesactivar: async(req, res) =>{
        const {id} = req.params;
        const venta = await Venta.findByIdAndUpdate(id, {estado: 0}, {new: true})
        res.json({venta})
    }



}

export default httpVentas 