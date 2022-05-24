const Categoria = require ('../models/categorias');


exports.crearCategoria  = (req,res) => {
    console.log("desde crear categoria");
}

exports.obtenerCategorias  = async (req,res) => {
    try {
        console.log("A");
        const categoria = await Categoria.findAll();
        res.json(categoria);
    } catch (error) {
        console.log(error);
    }
}