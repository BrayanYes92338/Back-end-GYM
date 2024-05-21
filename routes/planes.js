import {Router} from 'express'
import httpPlanes from '../controllers/planes.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersPlan from '../helpers/planes.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from '../middleware/validar-rol.js'

const router =Router()

router.get('/',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpPlanes.getPlanes)

router.get('/listar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpPlanes.getPlanesID)

router.get('/activos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpPlanes.getPlanesActivo)

router.get('/inactivos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpPlanes.getPlanesInactivo)

router.post('/',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('descripcion', "La descripcion no puede estar vacio").notEmpty(),
  check('valor', "El valor no puede estar vacio").notEmpty(),
  check('dias', "Los dias no pueden estar vacio").notEmpty(),
  validarCampos
], httpPlanes.postPlanes)

router.put('/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersPlan.validarExistaUsuarioId),
  validarCampos
], httpPlanes.putPlanes)

router.put('/activar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersPlan.validarExistaUsuarioId),
  validarCampos
], httpPlanes.putPlanesActivar)

router.put('/desactivar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersPlan.validarExistaUsuarioId),
  validarCampos
], httpPlanes.putPlanesDesactivar)

export default router
