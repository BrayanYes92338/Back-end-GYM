import {Router} from 'express'
import httpPagos from '../controllers/pagos.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersPago from '../helpers/pagos.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from '../middleware/validar-rol.js'

const router=Router()


router.get('/',[
    validarJWT,
    validarCampos
  ], httpPagos.getPagos)

router.get('/listar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpPagos.getPagosID)

router.get('/activos',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpPagos.getPagoActivo)

router.get('/inactivos',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpPagos.getPagoInactivo)

router.get('/pagosCliente/:idCliente',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpPagos.getPagosCliente)

router.post('/',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('idCliente', "El id cliente no puede estar vacio").notEmpty(),
    check('idCliente', "El id no es valido").isMongoId(),
    validarCampos
], httpPagos.postPagos)

router.put('/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersPago.validarExistaPagoId),
    validarCampos 
], httpPagos.putPagos)

router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersPago.validarExistaPagoId),
    validarCampos 
], httpPagos.putActivarPagos)

router.put('/desactivar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', "Se nesecita un mongoid valido").isMongoId(),
    check('id').custom(helpersPago.validarExistaPagoId),
    validarCampos 
], httpPagos.putDesactivarPagos)

export default router




