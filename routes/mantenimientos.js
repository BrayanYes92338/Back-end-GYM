import { Router} from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpMantenimientos from "../controllers/mantenimientos.js"
import helperMantenimientos from "../helpers/mantenimientos.js";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";

const router =Router()
router.get('/',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMantenimientos.getMantenimientos)

router.get('/listar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMantenimientos.getMantenimientosID) 

router.get('/activos',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMantenimientos.getMantenimientoActivo)

router.get('/inactivos',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMantenimientos.getMantenimientoInactivo)

router.post('/valorf',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMantenimientos.getMantenimientosValor)

router.get('/mantenimientoM/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMantenimientos.getMantenimientosMaquina)

router.post('/',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('idMaquina', 'El id de la maquina no puede estar vacio').notEmpty(),
    check('descripcion', 'La descripcion no puede estar vacia').notEmpty(),
    check('responsable', 'El responsable no puede estar vacio').notEmpty(),
    check('precio', 'El precio no puede estar vacio').notEmpty(),
    check('precio', 'El precio debe ser un numero').isNumeric(),
    check('idMaquina', 'Se necesita el MongoId de la maquina').isMongoId(),
    validarCampos
], httpMantenimientos.postMantenimientos)

router.put('/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helperMantenimientos.validarExistenciaId),
    validarCampos
], httpMantenimientos.putMantenimientos)

router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helperMantenimientos.validarExistenciaId),
    validarCampos
], httpMantenimientos.putMantenimientosActivar)

router.put('/desactivar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', 'Se necesita un codigo de MongoId valido').isMongoId(),
    check('id').custom(helperMantenimientos.validarExistenciaId),
    validarCampos
], httpMantenimientos.putMantenimientosDesactivar)



export default router;