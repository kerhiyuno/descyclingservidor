const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, usuariosPut, borrarUsuario } = require ('../controllers/usuarioController')
const  { check } = require('express-validator');
const { correoExiste, usuarioExistePorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, tieneRol } = require('../middlewares');

// api/categorias
router.post('/', [ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener mas de 6 letras').isLength({min:6}),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('rol','No es un rol válido').isIn(['admin','usuario']),
    check('correo').custom(correoExiste),
    validarCampos
] , crearUsuario
);

router.get('/', obtenerUsuarios
);

router.put('/:id', [
    check('id').custom(usuarioExistePorId),
    validarCampos
], usuariosPut
);

router.delete('/:id', [
    validarJWT,
    tieneRol('admin'),
    check('id').custom(usuarioExistePorId),
    validarCampos
], borrarUsuario
);
module.exports = router;