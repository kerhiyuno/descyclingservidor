const express = require('express');
const router = express.Router();
const {crearCategoria,obtenerCategorias} = require ('../controllers/categoriaController')

// api/categorias
router.post('/', 
    crearCategoria
);

router.get('/', 
    obtenerCategorias
);

module.exports = router;