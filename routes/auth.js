const express = require('express');
const router = express.Router();
const  { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login, GoogleSignIn, renovarToken, refreshToken } = require ('../controllers/authController');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/login', [
    check('correo','El correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
],GoogleSignIn);

router.get('/', validarJWT, renovarToken );

router.post('/refresh-token', refreshToken );

module.exports = router;