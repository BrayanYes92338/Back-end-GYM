import { Router } from "express";
import httpSedes from '../controllers/sedes.js'
import helperSedes from '../helpers/sedes.js'
import {validarCampos}  from '../middleware/validar-campos.js'
import { check } from "express-validator";
import { validarJWT } from "../middleware/validar-jwt.js";
import { validarRol } from "../middleware/validar-rol.js";

const router=Router() 

router.get('/',[
    validarJWT,
    validarCampos
  ],httpSedes.getSedes)

router.get('/listar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpSedes.getSedesID)

router.get('/activos',[
    validarJWT,
    validarCampos
  ], httpSedes.getSedesActivo)

router.get('/inactivos',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    validarCampos
  ], httpSedes.getSedesInactivo)

router.post('/',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('nombre', "El nombre no puede estar vacio").notEmpty(),
    check('dirrecion', "La dirrecion no puede quedar vacio").notEmpty(),
    check('horario', "El horario no debe estar vacio").notEmpty(),
    check('ciudad', "La parte de ciudad no debe estar vacio").notEmpty(),
    check('telefono', "El telefono no puede estar vacio").notEmpty(),
    validarCampos
], httpSedes.postSede)

router.put('/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', "Se necesita un mongoid Valido").isMongoId(),
    check('id').custom(helperSedes.validarExistaSedeId),
    validarCampos
],httpSedes.putSede)

router.put('/activar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', "Se necesita un mongoid Valido").isMongoId(),
    check('id').custom(helperSedes.validarExistaSedeId),
    validarCampos
],httpSedes.putSedeActivar)

router.put('/desactivar/:id',[
    validarJWT,
    validarRol(["ADMIN","RECEPCION"]),
    check('id', "Se necesita un mongoid Valido").isMongoId(),
    check('id').custom(helperSedes.validarExistaSedeId),
    validarCampos
],httpSedes.putSedeDesactivar)

export default router