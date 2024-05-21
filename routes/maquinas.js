import { Router} from "express";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import httpMaquinas from '../controllers/maquinas.js';
import helpersMaquinas from '../helpers/maquinas.js'
import {validarJWT} from '../middleware/validar-jwt.js'
import { validarRol } from "../middleware/validar-rol.js";

const router= Router();

router.get('/',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMaquinas.getMaquinas);

router.get('/listar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMaquinas.getMaquinaID)

router.get('/activos',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMaquinas.getMaquinaActivo)

router.get('/inactivos',[
    validarJWT,
    validarRol(["ADMIN"]),
    validarCampos
  ], httpMaquinas.getMaquinaInactivo)

router.post('/',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('idsede', 'La id de la sede no puede estar vacia').notEmpty(),
    check('idsede', 'se necesita el Mongoid de Sede valido').isMongoId(),
    validarCampos,validarJWT
], httpMaquinas.postMaquinas)

router.put('/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', 'Se necesita un id de MongoId valido').isMongoId(),
    check('id').custom(helpersMaquinas.validarExistenciaId),
    validarCampos,validarJWT
],httpMaquinas.putMaquinas)

router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', 'Se necesita un id de MongoId valido').isMongoId(),
    check('id').custom(helpersMaquinas.validarExistenciaId),
    validarCampos
], httpMaquinas.putMaquinasActivar)

router.put('/desactivar/:id',[
    validarJWT,
    validarRol(["ADMIN"]),
    check('id', 'Se necesita un id de MongoId valido').isMongoId(),
    check('id').custom(helpersMaquinas.validarExistenciaId),
    validarCampos
], httpMaquinas.putMaquinasDesactivar)



export default router