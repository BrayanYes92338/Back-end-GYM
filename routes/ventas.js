import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import helperVentas from "../helpers/ventas.js"
import httpVentas from "../controllers/ventas.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";


const router= Router()
router.get('/',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpVentas.getVenta)

router.get('/listar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpVentas.getVentaID)

router.get('/activos',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpVentas.getVentaActivo)

router.get('/inactivos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpVentas.getVentaInactivo)



router.post('/', [
    validarJWT,
    validarRol(["ADMIN"]),
    check('idProducto', ' Se necesita el id del producto').notEmpty(),
    check('idProducto', ' Se necesita un MongoId valido').isMongoId(),
    check('valorUnitario', ' Se necesita un valor unitario').notEmpty(),
    check('valorUnitario', ' El valor unitario debe ser numerico').isNumeric(),
    check('cantidad', ' Se necesita una cantidad').notEmpty(),
    check('cantidad', ' La cantidad debe ser numerica').isNumeric(),  
    validarCampos
], httpVentas.postVenta)

router.put('/:id',[ 
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', "Se necesita un MongoId que sea valido").isMongoId(),
    check('id').custom(helperVentas.validarExistenciaID),
    validarCampos
], httpVentas.putVentas)

router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', "Se necesita un MongoId que sea valido").isMongoId(),
    check('id').custom(helperVentas.validarExistenciaID),
    validarCampos
     ], httpVentas.putVentasActivar)

router.put('/desactivar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', "Se necesita un MongoId que sea valido").isMongoId(),
    check('id').custom(helperVentas.validarExistenciaID),
    validarCampos
], httpVentas.putVentasDesactivar)

export default router