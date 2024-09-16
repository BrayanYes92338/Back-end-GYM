import {Router} from 'express'
import httpUsuarios from '../controllers/usuarios.js'
import { check } from 'express-validator'
import { validarCampos } from '../middleware/validar-campos.js'
import helpersUsuario from '../helpers/usuarios.js'
import { validarJWT } from '../middleware/validar-jwt.js'
import { validarRol } from '../middleware/validar-rol.js'

const router=Router()

router.get('/',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
], httpUsuarios.getUsuarios)

router.get('/listar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
],  httpUsuarios.getUsuariosID)

router.get('/activos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
],  httpUsuarios.getUsuariosActivo)

router.get('/inactivos',[
  validarJWT,
  validarRol(["ADMIN"]),
  validarCampos
],  httpUsuarios.getUsuariosInactivo)

router.post('/',[
  check('idsede', "El idsede no puede estar vacio").notEmpty(),
  check('nombre', "El nombre no puede estar vacio").notEmpty(),
  check('direccion', "La dirección no puede estar vacio").notEmpty(),
  check('horario', "El horario no puede estar vacio").notEmpty(),
  check('ciudad', "La ciudad no puede estar vacio").notEmpty(),
  check('telefono', "El telefono no puede estar vacio").notEmpty(),
  check('correo', "El correo no puede estar vacio").notEmpty(),
  check('correo').custom(helpersUsuario.validarCorreoUnico),
  check('password', "El password no puede estar vacio").notEmpty(),
  validarCampos
], httpUsuarios.postUsuarios)

router.put('/actualizarpass', httpUsuarios.usuarioPutPassword)


router.put('/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersUsuario.validarExistaUsuarioId),
  validarCampos 
], httpUsuarios.putUsuarios)

router.put('/activar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersUsuario.validarExistaUsuarioId),
  validarCampos 
], httpUsuarios.putUsuariosActivar)

router.put('/desactivar/:id',[
  validarJWT,
  validarRol(["ADMIN"]),
  check('id', "Se nesecita un mongoid valido").isMongoId(),
  check('id').custom(helpersUsuario.validarExistaUsuarioId),
  validarCampos 
], httpUsuarios.putUsuariosDesactivar)

router.post('/login',[
  check('correo').custom(helpersUsuario.noExisteCorreo),
  check('correo', "El correo no es valido").isEmail(),
  validarCampos
],httpUsuarios.login)

router.post('/recuperar', httpUsuarios.enviarEmail)

router.get('/correo/:correo', httpUsuarios.usuarioGetEmail)



export default router
