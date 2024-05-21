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
  validarRol(["ADMIN"]),
  validarCampos
], httpIngresos.getIngresos)

router.get('/sede',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpIngresos.getIngresoSede)

router.get('/listar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpIngresos.getIngresosID)

router.get('/activos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpIngresos.getIngresoActivo)

router.get('/inactivos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpIngresos.getIngresoInactivo)

router.post('/',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('idsede', "El idsede no puede estar vacio").notEmpty(),
  check('idcliente', "El idsede no puede estar vacio").notEmpty(),
  check('codigo', "El codigo no puede estar vacio").notEmpty(),
  check('codigo').custom(helpersIngresos.validarCodigoUnico),
  validarCampos
], httpIngresos.postIngresos)

router.put('/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarCodigoUnico),
  validarCampos 
], httpIngresos.putIngresos)

router.put('/activar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarCodigoUnico),
  validarCampos 
], httpIngresos.putIngresosActivar)

router.put('/desactivar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersIngresos.validarCodigoUnico),
  validarCampos 
], httpIngresos.putIngresosDesactivar)

export default router 