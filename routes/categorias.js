const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {crearCategoria,obtenerCategorias,obtenerCategoriaPorId, categoriasPut, borrarCategoria} = require ('../controllers/categoriaController');
const { validarJWT, validarCampos, esAdmin } = require('../middlewares');
const { categoriaExistePorId } = require('../helpers/db-validators');

// api/categorias
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria
);

router.get('/', 
    obtenerCategorias
);

router.get('/:id', [
    check('id').custom(categoriaExistePorId),
    validarCampos
], obtenerCategoriaPorId
);

router.put('/:id', [
    validarJWT,
    check('id').custom(categoriaExistePorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPut
);

router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id').custom(categoriaExistePorId),
    validarCampos
], borrarCategoria
);

module.exports = router;