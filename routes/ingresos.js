import {Router} from 'express'
import httpIngresos from '../controllers/ingresos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersIngresos from '../helpers/ingresos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from '../middleware/validar-rol.js'


const router = Router()

router.get('/',[
  validarJWT,
  validarCampos
], httpIngresos.getIngresos)

router.get('/sede',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  validarCampos
], httpIngresos.getIngresoSede)

router.get('/listar/:id',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  validarCampos
], httpIngresos.getIngresosID)

router.get('/activos',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  validarCampos
], httpIngresos.getIngresoActivo)

router.get('/inactivos',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  validarCampos
], httpIngresos.getIngresoInactivo)

router.post('/',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  check('idsede', "El idsede no puede estar vacio").notEmpty(),
  check('idcliente', "El idsede no puede estar vacio").notEmpty(),
  validarCampos
], httpIngresos.postIngresos)

router.put('/:id',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarExistaIngresoId),
  validarCampos 
], httpIngresos.putIngresos)

router.put('/activar/:id',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarExistaIngresoId),
  validarCampos 
], httpIngresos.putIngresosActivar)

router.put('/desactivar/:id',[
  validarJWT,
 validarRol(["ADMIN","RECEPCION"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarExistaIngresoId),
  validarCampos 
], httpIngresos.putIngresosDesactivar)

export default router 