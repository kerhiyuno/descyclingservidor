const express = require('express');
const router = express.Router();
const {crearProducto, obtenerProductos, obtenerProductoPorId, productosPut, borrarProducto } = require ('../controllers/productoController');
const { validarJWT, validarCampos, esAdmin } = require('../middlewares');
const { productoExistePorId } = require('../helpers/db-validators');
const { check } = require('express-validator');

// api/productos
router.post('/',[
    validarJWT
], crearProducto
);

router.get('/',
    obtenerProductos
);

router.get('/:id', [
    check('id').custom(productoExistePorId),
    validarCampos
], obtenerProductoPorId
);

router.put('/:id', [
    validarJWT,
    check('id').custom(productoExistePorId),
    validarCampos
], productosPut
);

router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id').custom(productoExistePorId),
    validarCampos
], borrarProducto
);
module.exports = router;