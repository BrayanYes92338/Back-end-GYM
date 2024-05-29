import express from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import usuarios from "./routes/usuarios.js"
import sedes from "./routes/sedes.js"
import clientes from "./routes/clientes.js"
import ingresos from "./routes/ingresos.js"
import planes from "./routes/planes.js"
import maquinas from "./routes/maquinas.js"
import mantenimientos from "./routes/mantenimientos.js"
import productos from "./routes/productos.js"
import ventas from "./routes/ventas.js"
import pagos from "./routes/pagos.js"
import httpClientes from "./controllers/clientes.js"
import cors from 'cors'



const app = express()
app.use(express.json())
app.use(cors())

httpClientes.putDesactivarClientes()

app.use("/api/usuarios",usuarios)
app.use("/api/sedes",sedes)
app.use("/api/clientes",clientes)
app.use("/api/ingresos",ingresos)
app.use("/api/planes",planes)
app.use('/api/maquinas', maquinas)
app.use('/api/mantenimientos', mantenimientos);
app.use('/api/productos', productos)
app.use('/api/ventas', ventas)
app.use('/api/pagos', pagos) 





app.listen(process.env.PORT, async () =>{
  await dbConexion()
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})