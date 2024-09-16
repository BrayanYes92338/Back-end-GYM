import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpProductos from "../controllers/productos.js"
import helperProductos from "../helpers/productos.js"
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";

const router = Router();
router.get('/',[
    validarJWT,
    validarCampos
  ], httpProductos.getProductos);

router.get('/listar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpProductos.getProductosID)

router.get('/activos',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpProductos.getProductosActivo)

router.get('/inactivos',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpProductos.getProductosInactivo)

router.post('/', [
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('nombre', 'Se debe agregar un nombre').notEmpty(),
    check('valor', 'Se debe agregar un valor para el producto').notEmpty(),
    check('valor', 'El valor debe ser numero').isNumeric(),
    check('cantidad', 'Se debe agregar una cantidad para el producto').notEmpty(),
    check('cantidad', 'La cantidad debe ser numerica').isNumeric(),
    validarCampos
],httpProductos.postProductos)

router.put('/:id', [
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', 'Se neceita un id de MongoId valido ').isMongoId(),
    check('id').custom(helperProductos.validarExistenciaId),
    validarCampos
], httpProductos.putProductos)

router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', 'Se neceita un id de MongoId valido ').isMongoId(),
    check('id').custom(helperProductos.validarExistenciaId),
    validarCampos
],httpProductos.putProductosActivar)

router.put('/desactivar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', 'Se neceita un id de MongoId valido ').isMongoId(),
    check('id').custom(helperProductos.validarExistenciaId),
    validarCampos
],httpProductos.putProductosDesactivar)


export default router